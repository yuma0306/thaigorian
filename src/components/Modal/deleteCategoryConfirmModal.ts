import type { ModalProps } from './Modal';

export function deleteCategoryConfirmModal(onAgree: () => void): ModalProps {
	return {
		title: 'Delete collection?',
		description: 'This phrase collection will be deleted. Continue?',
		agreeLabel: 'Delete',
		disagreeLabel: 'Cancel',
		onAgree,
		onDisagree: () => {}
	};
}
