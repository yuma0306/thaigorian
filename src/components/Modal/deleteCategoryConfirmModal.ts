import type { ModalProps } from './Modal';

export function deleteCategoryConfirmModal(onAgree: () => void): ModalProps {
	return {
		title: '削除の確認',
		description: 'このフレーズ集を削除します。よろしいですか？',
		agreeLabel: '削除する',
		disagreeLabel: 'キャンセル',
		onAgree,
		onDisagree: () => {}
	};
}
