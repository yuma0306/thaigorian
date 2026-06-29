import { Fragment } from 'react';
import { CardImage } from '@/components/CardImage/CardImage';
import { CardImageList } from '@/components/CardImageList/CardImageList';
import { Hr } from '@/components/Hr/Hr';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import type { SpeechLang } from '@/constants/speechLangs';
import { groupBySpeechLang } from '@/functions/groupBySpeechLang';

type Item = {
	id: string;
	title: string;
	speechLang: SpeechLang;
};

type Props = {
	items: Item[];
	getHref: (id: string) => string;
};

export function SpeechLangCardImageList({ items, getHref }: Props) {
	const groups = groupBySpeechLang(items);

	return (
		<Stack size={3} variant="div">
			{groups.map((group, index) => (
				<Fragment key={group.value}>
					{index > 0 && <Hr />}
					<Stack size={2} variant="section">
						<Typography size={3} variant="h2" color="secondary" weight="bold" align="center">
							{group.label}
						</Typography>
						<CardImageList>
							{group.items.map((item) => (
								<CardImage key={item.id} id={item.id} href={getHref(item.id)} title={item.title} />
							))}
						</CardImageList>
					</Stack>
				</Fragment>
			))}
		</Stack>
	);
}
