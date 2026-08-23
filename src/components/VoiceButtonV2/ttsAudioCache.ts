import { TTS_CACHE_VERSION } from '@/constants/geminiTts';

const DB_NAME = 'thaigorian-tts';
const STORE_NAME = 'audio';
const DB_VERSION = 1;

function createCacheKey(text: string, lang: string): string {
	return `${TTS_CACHE_VERSION}:${lang}:${text}`;
}

function openTtsAudioDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			reject(request.error ?? new Error('Failed to open TTS cache database'));
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onupgradeneeded = () => {
			const database = request.result;
			if (!database.objectStoreNames.contains(STORE_NAME)) {
				database.createObjectStore(STORE_NAME);
			}
		};
	});
}

function runStoreRequest<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
	return openTtsAudioDatabase().then(
		(database) =>
			new Promise<T>((resolve, reject) => {
				const transaction = database.transaction(STORE_NAME, mode);
				const request = run(transaction.objectStore(STORE_NAME));

				const closeDatabase = () => {
					database.close();
				};

				transaction.oncomplete = () => {
					closeDatabase();
					resolve(request.result as T);
				};

				transaction.onerror = () => {
					closeDatabase();
					reject(transaction.error ?? new Error('TTS cache transaction failed'));
				};

				request.onerror = () => {
					closeDatabase();
					reject(request.error ?? new Error('TTS cache request failed'));
				};
			})
	);
}

export async function getOrFetchTtsAudio(text: string, lang: string): Promise<Blob> {
	const cached = await getCachedTtsAudio(text, lang);
	if (cached) {
		return cached;
	}

	const response = await fetch('/api/tts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text, lang })
	});

	if (!response.ok) {
		throw new Error('TTS request failed');
	}

	const blob = await response.blob();
	void setCachedTtsAudio(text, lang, blob);
	return blob;
}

async function getCachedTtsAudio(text: string, lang: string): Promise<Blob | null> {
	if (typeof indexedDB === 'undefined') {
		return null;
	}

	try {
		const result = await runStoreRequest<Blob | undefined>('readonly', (store) =>
			store.get(createCacheKey(text, lang))
		);

		return result ?? null;
	} catch {
		return null;
	}
}

async function setCachedTtsAudio(text: string, lang: string, blob: Blob): Promise<void> {
	if (typeof indexedDB === 'undefined') {
		return;
	}

	try {
		await runStoreRequest<IDBValidKey>('readwrite', (store) =>
			store.put(blob, createCacheKey(text, lang))
		);
	} catch {
		// Cache write failures should not block playback.
	}
}
