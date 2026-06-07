import type { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';
import { CategoryTextField } from '@/components/CategoryTextField/CategoryTextField';
import { PhraseFieldCardMenu } from '@/components/PhraseFieldCardMenu/PhraseFieldCardMenu';
import type { CategoryRegisterFormValues } from '@/schemas/myCategory';
import type { MenuState } from '@/types/myCategoryRegister';
import { Stack } from '../Stack/Stack';
import { PhraseWordFieldsSection } from './PhraseWordFieldsSection';

type Props = {
	control: Control<CategoryRegisterFormValues>;
	phraseIndex: number;
	phraseId: string;
	phraseCount: number;
	openMenu: MenuState;
	onToggleMenu: (event: MouseEvent<HTMLButtonElement>, menu: Exclude<MenuState, null>) => void;
	onInsertPhrase: (index: number) => void;
	onMovePhrase: (fromIndex: number, toIndex: number) => void;
	onRemovePhrase: (index: number) => void;
	onCloseMenu: () => void;
};

export function PhraseFieldCardBody({
	control,
	phraseIndex,
	phraseId,
	phraseCount,
	openMenu,
	onToggleMenu,
	onInsertPhrase,
	onMovePhrase,
	onRemovePhrase,
	onCloseMenu
}: Props) {
	return (
		<Stack variant="div" size={2}>
			<CategoryTextField
				id={`phrase-${phraseId}`}
				label="フレーズ"
				name={`phrases.${phraseIndex}.phrase`}
				control={control}
				labelAction={
					<PhraseFieldCardMenu
						phraseId={phraseId}
						phraseIndex={phraseIndex}
						phraseCount={phraseCount}
						openMenu={openMenu}
						onToggleMenu={onToggleMenu}
						onInsertPhrase={onInsertPhrase}
						onMovePhrase={onMovePhrase}
						onRemovePhrase={onRemovePhrase}
					/>
				}
			/>
			<CategoryTextField
				id={`meaning-${phraseId}`}
				label="意味"
				name={`phrases.${phraseIndex}.meaning`}
				control={control}
			/>
			<PhraseWordFieldsSection
				control={control}
				phraseIndex={phraseIndex}
				openMenu={openMenu}
				onToggleMenu={onToggleMenu}
				onCloseMenu={onCloseMenu}
			/>
		</Stack>
	);
}
