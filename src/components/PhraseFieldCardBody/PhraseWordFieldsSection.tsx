import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { PhraseAddButton } from '@/components/PhraseAddButton/PhraseAddButton';
import { PhraseAddButtonWrapper } from '@/components/PhraseAddButtonWrapper/PhraseAddButtonWrapper';
import { maxWordsPerPhrase } from '@/constants/myCategoryLimits';
import { useWordFieldArray } from '@/hooks/useWordFieldArray';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Typography } from '../Typography/Typography';
import { PhraseWordFieldList } from './PhraseWordFieldList';
import styles from './PhraseWordFieldsSection.module.css';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onCloseMenu: () => void;
};

export function PhraseWordFieldsSection({
	control,
	phraseIndex,
	openMenu,
	onToggleMenu,
	onCloseMenu
}: Props) {
	const wordActions = useWordFieldArray({ control, phraseIndex, onCloseMenu });

	return (
		<div className={styles.section}>
			{wordActions.wordFields.length < 1 && (
				<PhraseAddButton
					onClick={wordActions.handleAddWord}
					layer="secound"
					position="left"
					isAbsolute={false}
				/>
			)}
			{wordActions.wordFields.length > 0 && (
				<>
					<PhraseWordFieldList
						control={control}
						phraseIndex={phraseIndex}
						wordFields={wordActions.wordFields}
						openMenu={openMenu}
						onToggleMenu={onToggleMenu}
						onInsertWord={wordActions.handleInsertWord}
						onMoveWord={wordActions.handleMoveWord}
						onRemoveWord={wordActions.handleRemoveWord}
					/>
					{wordActions.canAddWord ? (
						<PhraseAddButtonWrapper layer="secound">
							<PhraseAddButton
								onClick={wordActions.handleAddWord}
								layer="secound"
								position="center"
								isAbsolute
							/>
						</PhraseAddButtonWrapper>
					) : (
						<Typography size={2} variant="p" color="gray" weight="normal" align="left">
							Maximum {maxWordsPerPhrase} terms
						</Typography>
					)}
				</>
			)}
		</div>
	);
}
