import type { MouseEvent } from 'react';
import styles from '@/components/MyCategoryRegister/MyCategoryRegister.module.css';

type Props = {
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

export function FieldMenu({
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
}: Props) {
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
