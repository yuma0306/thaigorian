import { Button } from '@/components/Button/Button';
import styles from './CategoryRegisterActions.module.css';

type Props = {
	saveLabel: string;
	isSaving: boolean;
	onSaveClick: () => void;
	viewHref?: string;
};

export function CategoryRegisterActions({ saveLabel, isSaving, onSaveClick, viewHref }: Props) {
	const hasViewLink = Boolean(viewHref);

	return (
		<div className={styles.sticky} data-has-view={hasViewLink}>
			{viewHref && (
				<Button variant="a" color="secondary" href={viewHref} isFloating marginInline={false}>
					マイフレーズを見る
				</Button>
			)}
			<Button
				variant="button"
				color="secondary"
				isFloating={hasViewLink}
				marginInline={!hasViewLink}
				disabled={isSaving}
				onClick={onSaveClick}
			>
				{isSaving ? '保存中...' : saveLabel}
			</Button>
		</div>
	);
}
