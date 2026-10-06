import { Button } from '@/components/Button/Button';
import { ScrollToEdgeButton } from '@/components/ScrollToEdgeButton/ScrollToEdgeButton';
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
		<div className={styles.sticky}>
			<div className={styles.scrolls}>
				<ScrollToEdgeButton direction="top" />
				<ScrollToEdgeButton direction="bottom" />
			</div>
			<div className={styles.actions} data-has-view={hasViewLink}>
				{viewHref && (
					<Button variant="a" color="secondary" href={viewHref} isFloating marginInline={false}>
						My Phrases
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
					{isSaving ? 'Saving...' : saveLabel}
				</Button>
			</div>
		</div>
	);
}
