import styles from './Modal.module.css';

export type ModalProps = {
	title: string;
	description: string;
	agreeLabel: string;
	disagreeLabel: string;
	onAgree: () => void;
	onDisagree: () => void;
};

export function Modal({
	title,
	description,
	agreeLabel,
	disagreeLabel,
	onAgree,
	onDisagree
}: ModalProps) {
	return (
		<div className={styles.overlay} role="presentation" onClick={onDisagree}>
			<div
				aria-labelledby="modal-title"
				aria-modal="true"
				className={styles.dialog}
				role="dialog"
				onClick={(event) => event.stopPropagation()}
			>
				<p className={styles.title} id="modal-title">
					{title}
				</p>
				<p className={styles.description}>{description}</p>
				<div className={styles.actions}>
					<button className={styles.disagreeButton} type="button" onClick={onDisagree}>
						{disagreeLabel}
					</button>
					<button className={styles.agreeButton} type="button" onClick={onAgree}>
						{agreeLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
