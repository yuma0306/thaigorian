import type { MouseEvent } from 'react';
import type { Control, FieldArrayWithId } from 'react-hook-form';
import styles from './PhraseRepeaterSection.module.css';
import { PhraseFieldCard } from '@/components/PhraseFieldCard/PhraseFieldCard';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Typography } from '@/components/Typography/Typography';
import { Stack } from '../Stack/Stack';
import { PhraseAddButton } from '@/components/PhraseAddButton/PhraseAddButton';
import { PhraseAddButtonWrapper } from '../PhraseAddButtonWrapper/PhraseAddButtonWrapper';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseFields: FieldArrayWithId<CategoryRegisterFormValues, 'phrases', 'fieldKey'>[];
	openMenu: MenuState;
	onAddPhrase: () => void;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (index: number) => void;
	onCloseMenu: () => void;
};

export function PhraseRepeaterSection({
	control,
	phraseFields,
	openMenu,
	onAddPhrase,
	onToggleMenu,
	onInsertPhrase,
	onMovePhrase,
	onRemovePhrase,
	onCloseMenu
}: Props) {
	return (
		<Stack variant="div" size={2}>
			<Typography size={3} variant="span" color="primary" weight="bold" align="left">
				フレーズ集
			</Typography>
			{phraseFields.length === 0 ? (
				<button
					className={styles.timelineAddButton}
					type="button"
					onClick={onAddPhrase}
					aria-label="フィールドを追加"
				>
					<span aria-hidden="true">＋</span>
				</button>
			) : (
				<div className={styles.repeaterList}>
					{phraseFields.map((phrase, phraseIndex) => (
						<PhraseFieldCard
							key={phrase.fieldKey}
							control={control}
							phraseIndex={phraseIndex}
							phraseId={phrase.id}
							phraseCount={phraseFields.length}
							openMenu={openMenu}
							onToggleMenu={onToggleMenu}
							onInsertPhrase={onInsertPhrase}
							onMovePhrase={onMovePhrase}
							onRemovePhrase={onRemovePhrase}
							onCloseMenu={onCloseMenu}
						/>
					))}
					<PhraseAddButtonWrapper layer="first">
						<PhraseAddButton onClick={onAddPhrase} position="center" layer="first" isAbsolute />
					</PhraseAddButtonWrapper>
				</div>
			)}
		</Stack>
	);
}
