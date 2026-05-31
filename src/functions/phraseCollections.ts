import 'server-only';

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type {
	PhraseCollection,
	PhraseCollectionFile,
	PhraseCollectionIndexEntry
} from '@/types/database';

const phrasesDataDir = path.join(process.cwd(), 'src/data/phrases');

async function readIndex() {
	const raw = await readFile(path.join(phrasesDataDir, 'index.json'), 'utf8');
	return JSON.parse(raw) as PhraseCollectionIndexEntry[];
}

async function loadCollection(entry: PhraseCollectionIndexEntry): Promise<PhraseCollection> {
	const raw = await readFile(path.join(phrasesDataDir, entry.file), 'utf8');
	const data = JSON.parse(raw) as PhraseCollectionFile;

	return {
		id: entry.id,
		title: data.title,
		...(data.description !== undefined ? { description: data.description } : {}),
		phrases: data.phrases
	};
}

/** トップ一覧用（index.json のみ参照） */
export async function getPhraseCollectionSummaries() {
	return readIndex();
}

export async function getPhraseCollections(): Promise<PhraseCollection[]> {
	const index = await readIndex();
	return Promise.all(index.map(loadCollection));
}

export async function getPhraseCollectionById(id: string): Promise<PhraseCollection | undefined> {
	const index = await readIndex();
	const entry = index.find((item) => item.id === id);
	if (!entry) {
		return undefined;
	}
	return loadCollection(entry);
}
