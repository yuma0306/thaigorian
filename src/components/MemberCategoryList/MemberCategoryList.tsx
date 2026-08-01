import { SpeechLangCardImageList } from '@/components/SpeechLangCardImageList/SpeechLangCardImageList';
import { paths } from '@/constants/paths';
import type { MyCategoryListItem } from '@/types/database';

type Props = {
	categories: MyCategoryListItem[];
};

export function MemberCategoryList({ categories }: Props) {
	return (
		<SpeechLangCardImageList
			items={categories.map((category) => ({
				id: category.id,
				title: category.title ?? '無題',
				href: paths.memberPhrasesDetail(category.id),
				speechLang: category.speechLang
			}))}
		/>
	);
}
