'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { Inner } from '@/components/Inner/Inner';
import { paths } from '@/constants/paths';
import type { SaveMyCategoryPayload, SaveMyCategoryResult } from '@/app/member/category/actions';
import styles from './MyCategoryRegister.module.css';

type WordField = {
	id: string;
	word: string;
	meaning: string;
};

type PhraseField = {
	id: string;
	phrase: string;
	meaning: string;
	ipa: string;
	words: WordField[];
};

type MenuState =
	| {
			type: 'phrase';
			id: string;
	  }
	| {
			type: 'word';
			id: string;
	  }
	| null;

const createId = () => crypto.randomUUID();

const createWord = (): WordField => ({
	id: createId(),
	word: '',
	meaning: ''
});

const createPhrase = (): PhraseField => ({
	id: createId(),
	phrase: '',
	meaning: '',
	ipa: '',
	words: []
});

type Props = {
	categoryId?: string;
	initialPhrases?: PhraseField[];
	initialTitle?: string;
	initialContentId?: string;
	onDelete?: (categoryId: string) => Promise<SaveMyCategoryResult>;
	onSave: (payload: SaveMyCategoryPayload) => Promise<SaveMyCategoryResult>;
	saveLabel?: string;
};

export function MyCategoryRegister({
	categoryId,
	initialPhrases = [],
	initialTitle = '',
	initialContentId,
	onDelete,
	onSave,
	saveLabel = '保存する'
}: Props) {
	const router = useRouter();
	const [title, setTitle] = useState(initialTitle);
	const [contentId] = useState(() => initialContentId ?? `category-${createId()}`);
	const [phrases, setPhrases] = useState<PhraseField[]>(initialPhrases);
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [message, setMessage] = useState('');
	const [openMenu, setOpenMenu] = useState<MenuState>(null);

	function addPhrase() {
		setPhrases((currentPhrases) => [...currentPhrases, createPhrase()]);
	}

	function insertPhrase(index: number) {
		setPhrases((currentPhrases) => [
			...currentPhrases.slice(0, index),
			createPhrase(),
			...currentPhrases.slice(index)
		]);
		setOpenMenu(null);
	}

	function removePhrase(phraseId: string) {
		setPhrases((currentPhrases) => currentPhrases.filter((phrase) => phrase.id !== phraseId));
		setOpenMenu(null);
	}

	function movePhrase(fromIndex: number, toIndex: number) {
		setPhrases((currentPhrases) => {
			if (toIndex < 0 || toIndex >= currentPhrases.length) {
				return currentPhrases;
			}

			const nextPhrases = [...currentPhrases];
			const [movedPhrase] = nextPhrases.splice(fromIndex, 1);
			if (!movedPhrase) {
				return currentPhrases;
			}

			nextPhrases.splice(toIndex, 0, movedPhrase);
			return nextPhrases;
		});
		setOpenMenu(null);
	}

	function updatePhrase(
		phraseId: string,
		key: keyof Omit<PhraseField, 'id' | 'words'>,
		value: string
	) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) =>
				phrase.id === phraseId ? { ...phrase, [key]: value } : phrase
			)
		);
	}

	function addWord(phraseId: string) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) =>
				phrase.id === phraseId ? { ...phrase, words: [...phrase.words, createWord()] } : phrase
			)
		);
	}

	function insertWord(phraseId: string, index: number) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) =>
				phrase.id === phraseId
					? {
							...phrase,
							words: [...phrase.words.slice(0, index), createWord(), ...phrase.words.slice(index)]
						}
					: phrase
			)
		);
		setOpenMenu(null);
	}

	function removeWord(phraseId: string, wordId: string) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) =>
				phrase.id === phraseId
					? { ...phrase, words: phrase.words.filter((word) => word.id !== wordId) }
					: phrase
			)
		);
		setOpenMenu(null);
	}

	function moveWord(phraseId: string, fromIndex: number, toIndex: number) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) => {
				if (phrase.id !== phraseId || toIndex < 0 || toIndex >= phrase.words.length) {
					return phrase;
				}

				const nextWords = [...phrase.words];
				const [movedWord] = nextWords.splice(fromIndex, 1);
				if (!movedWord) {
					return phrase;
				}

				nextWords.splice(toIndex, 0, movedWord);
				return { ...phrase, words: nextWords };
			})
		);
		setOpenMenu(null);
	}

	function toggleMenu(event: MouseEvent<HTMLButtonElement>, nextMenu: Exclude<MenuState, null>) {
		event.preventDefault();
		event.stopPropagation();
		setOpenMenu((currentMenu) =>
			currentMenu?.type === nextMenu.type && currentMenu.id === nextMenu.id ? null : nextMenu
		);
	}

	function updateWord(
		phraseId: string,
		wordId: string,
		key: keyof Omit<WordField, 'id'>,
		value: string
	) {
		setPhrases((currentPhrases) =>
			currentPhrases.map((phrase) =>
				phrase.id === phraseId
					? {
							...phrase,
							words: phrase.words.map((word) =>
								word.id === wordId ? { ...word, [key]: value } : word
							)
						}
					: phrase
			)
		);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage('');
		setIsSaving(true);

		try {
			const result = await onSave({
				contentId,
				title,
				phrases: phrases.map((phrase) => ({
					fieldId: phrase.id,
					phrase: phrase.phrase,
					meaning: phrase.meaning,
					ipa: phrase.ipa,
					words: phrase.words.map((word) => ({
						fieldId: word.id,
						word: word.word,
						meaning: word.meaning
					}))
				}))
			});

			if (!result.ok) {
				setMessage(result.message);
				setIsSaving(false);
				return;
			}

			setMessage('保存しました。');
			setIsSaving(false);
			router.push(paths.memberCategory);
		} catch {
			setMessage('保存に失敗しました。');
			setIsSaving(false);
		}
	}

	async function handleDelete() {
		if (!categoryId || !onDelete || isDeleting) {
			return;
		}

		setMessage('');
		setIsDeleting(true);

		try {
			const result = await onDelete(categoryId);

			if (!result.ok) {
				setMessage(result.message);
				setIsDeleting(false);
				return;
			}

			router.push(paths.memberCategory);
		} catch {
			setMessage('削除に失敗しました。');
			setIsDeleting(false);
		}
	}

	return (
		<Inner>
			<section className={styles.page}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.field}>
						<label className={styles.label} htmlFor="category-title">
							タイトル
						</label>
						<input
							className={styles.input}
							id="category-title"
							type="text"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</div>

					<section className={styles.repeaterSection}>
						<div className={styles.sectionTitle}>
							<h1>フレーズ集</h1>
						</div>

						{phrases.length === 0 ? (
							<button
								className={styles.timelineAddButton}
								type="button"
								onClick={addPhrase}
								aria-label="フィールドを追加"
							>
								<span aria-hidden="true">＋</span>
							</button>
						) : (
							<div className={styles.repeaterList}>
								{phrases.map((phrase, phraseIndex) => (
									<article className={styles.phraseCard} key={phrase.id}>
										<div className={styles.timeline}>
											<span className={styles.number}>{phraseIndex + 1}</span>
										</div>
										<details className={styles.cardBody} open>
											<summary className={styles.groupLabel}>
												<span className={styles.visuallyHidden}>開く・閉じる</span>
												<div className={styles.menuWrapper}>
													<button
														className={styles.menuButton}
														type="button"
														onClick={(event) =>
															toggleMenu(event, { type: 'phrase', id: phrase.id })
														}
														aria-label={`フレーズ${phraseIndex + 1}の操作を開く`}
													>
														⋮
													</button>
													{openMenu?.type === 'phrase' && openMenu.id === phrase.id && (
														<FieldMenu
															addAboveLabel="上にフィールドを追加"
															addBelowLabel="下にフィールドを追加"
															moveUpLabel="1つ上に移動"
															moveDownLabel="1つ下に移動"
															deleteLabel="フィールドを削除"
															isMoveUpDisabled={phraseIndex === 0}
															isMoveDownDisabled={phraseIndex === phrases.length - 1}
															onAddAbove={() => insertPhrase(phraseIndex)}
															onAddBelow={() => insertPhrase(phraseIndex + 1)}
															onMoveUp={() => movePhrase(phraseIndex, phraseIndex - 1)}
															onMoveDown={() => movePhrase(phraseIndex, phraseIndex + 1)}
															onDelete={() => removePhrase(phrase.id)}
														/>
													)}
												</div>
											</summary>

											<div className={styles.detailsContent}>
												<TextField
													id={`phrase-${phrase.id}`}
													label="フレーズ"
													value={phrase.phrase}
													onChange={(value) => updatePhrase(phrase.id, 'phrase', value)}
												/>
												<TextField
													id={`meaning-${phrase.id}`}
													label="意味"
													value={phrase.meaning}
													onChange={(value) => updatePhrase(phrase.id, 'meaning', value)}
												/>
												<details className={styles.optionalField}>
													<summary className={styles.optionalSummary}>IPA（任意）</summary>
													<input
														className={styles.input}
														id={`ipa-${phrase.id}`}
														type="text"
														value={phrase.ipa}
														onChange={(event) => updatePhrase(phrase.id, 'ipa', event.target.value)}
														aria-label="IPA"
													/>
												</details>

												<section className={styles.wordsSection}>
													<div className={styles.sectionTitle}>
														<h2>用語</h2>
													</div>

													{phrase.words.length > 0 && (
														<div className={styles.wordList}>
															{phrase.words.map((word, wordIndex) => (
																<article className={styles.wordCard} key={word.id}>
																	<div className={styles.timeline}>
																		<span className={styles.number}>{wordIndex + 1}</span>
																	</div>
																	<details className={styles.cardBody} open>
																		<summary className={styles.groupLabel}>
																			<span className={styles.visuallyHidden}>開く・閉じる</span>
																			<div className={styles.menuWrapper}>
																				<button
																					className={styles.menuButton}
																					type="button"
																					onClick={(event) =>
																						toggleMenu(event, {
																							type: 'word',
																							id: word.id
																						})
																					}
																					aria-label={`用語${wordIndex + 1}の操作を開く`}
																				>
																					⋮
																				</button>
																				{openMenu?.type === 'word' && openMenu.id === word.id && (
																					<FieldMenu
																						addAboveLabel="上に用語を追加"
																						addBelowLabel="下に用語を追加"
																						moveUpLabel="1つ上に移動"
																						moveDownLabel="1つ下に移動"
																						deleteLabel="用語を削除"
																						isMoveUpDisabled={wordIndex === 0}
																						isMoveDownDisabled={
																							wordIndex === phrase.words.length - 1
																						}
																						onAddAbove={() => insertWord(phrase.id, wordIndex)}
																						onAddBelow={() => insertWord(phrase.id, wordIndex + 1)}
																						onMoveUp={() =>
																							moveWord(phrase.id, wordIndex, wordIndex - 1)
																						}
																						onMoveDown={() =>
																							moveWord(phrase.id, wordIndex, wordIndex + 1)
																						}
																						onDelete={() => removeWord(phrase.id, word.id)}
																					/>
																				)}
																			</div>
																		</summary>
																		<div className={styles.detailsContent}>
																			<TextField
																				id={`word-${word.id}`}
																				label="用語"
																				value={word.word}
																				onChange={(value) =>
																					updateWord(phrase.id, word.id, 'word', value)
																				}
																			/>
																			<TextField
																				id={`word-meaning-${word.id}`}
																				label="意味"
																				value={word.meaning}
																				onChange={(value) =>
																					updateWord(phrase.id, word.id, 'meaning', value)
																				}
																			/>
																		</div>
																	</details>
																</article>
															))}
														</div>
													)}

													<button
														className={styles.wordTimelineAddButton}
														type="button"
														onClick={() => addWord(phrase.id)}
														aria-label="用語のフィールドを追加"
													>
														<span aria-hidden="true">＋</span>
													</button>
												</section>
											</div>
										</details>
									</article>
								))}
								<button
									className={styles.timelineAddButton}
									type="button"
									onClick={addPhrase}
									aria-label="フィールドを追加"
								>
									<span aria-hidden="true">＋</span>
								</button>
							</div>
						)}
					</section>

					<div className={styles.actions}>
						<a className={styles.secondaryLink} href={paths.memberCategory}>
							戻る
						</a>
						{categoryId && onDelete && (
							<button
								className={styles.deleteButton}
								type="button"
								disabled={isDeleting || isSaving}
								onClick={handleDelete}
							>
								{isDeleting ? '削除中...' : '削除する'}
							</button>
						)}
						<button className={styles.saveButton} type="submit" disabled={isSaving}>
							{isSaving ? '保存中...' : saveLabel}
						</button>
					</div>
					{message && (
						<p className={styles.statusMessage} role="status">
							{message}
						</p>
					)}
				</form>
			</section>
		</Inner>
	);
}

type TextFieldProps = {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
};

type FieldMenuProps = {
	addAboveLabel: string;
	addBelowLabel: string;
	moveUpLabel: string;
	moveDownLabel: string;
	deleteLabel: string;
	isMoveUpDisabled: boolean;
	isMoveDownDisabled: boolean;
	onAddAbove: () => void;
	onAddBelow: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
	onDelete: () => void;
};

function FieldMenu({
	addAboveLabel,
	addBelowLabel,
	moveUpLabel,
	moveDownLabel,
	deleteLabel,
	isMoveUpDisabled,
	isMoveDownDisabled,
	onAddAbove,
	onAddBelow,
	onMoveUp,
	onMoveDown,
	onDelete
}: FieldMenuProps) {
	function handleAction(event: MouseEvent<HTMLButtonElement>, action: () => void) {
		event.preventDefault();
		event.stopPropagation();
		action();
	}

	return (
		<div className={styles.fieldMenu} role="menu">
			<button type="button" role="menuitem" onClick={(event) => handleAction(event, onAddAbove)}>
				<span aria-hidden="true">＋</span>
				{addAboveLabel}
			</button>
			<button type="button" role="menuitem" onClick={(event) => handleAction(event, onAddBelow)}>
				<span aria-hidden="true">＋</span>
				{addBelowLabel}
			</button>
			<hr />
			<button
				type="button"
				role="menuitem"
				disabled={isMoveUpDisabled}
				onClick={(event) => handleAction(event, onMoveUp)}
			>
				<span aria-hidden="true">↑</span>
				{moveUpLabel}
			</button>
			<button
				type="button"
				role="menuitem"
				disabled={isMoveDownDisabled}
				onClick={(event) => handleAction(event, onMoveDown)}
			>
				<span aria-hidden="true">↓</span>
				{moveDownLabel}
			</button>
			<hr />
			<button type="button" role="menuitem" onClick={(event) => handleAction(event, onDelete)}>
				<span aria-hidden="true">□</span>
				{deleteLabel}
			</button>
		</div>
	);
}

function TextField({ id, label, value, onChange }: TextFieldProps) {
	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.input}
				id={id}
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</div>
	);
}
