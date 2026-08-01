'use client';

import { useState } from 'react';
import { CardImage } from '@/components/CardImage/CardImage';
import { CardImageList } from '@/components/CardImageList/CardImageList';
import { Stack } from '@/components/Stack/Stack';
import { Typography } from '@/components/Typography/Typography';
import { defaultSpeechLang, type SpeechLang } from '@/constants/speechLangs';
import { groupBySpeechLang } from '@/functions/groupBySpeechLang';
import styles from './SpeechLangCardImageList.module.css';

type Item = {
	id: string;
	title: string;
	href: string;
	speechLang: SpeechLang;
};

type Props = {
	items: Item[];
};

export function SpeechLangCardImageList({ items }: Props) {
	const groups = groupBySpeechLang(items);
	const [activeLang, setActiveLang] = useState<SpeechLang>(defaultSpeechLang);
	const activeGroup = groups.find((group) => group.value === activeLang) ?? groups[0];

	if (!activeGroup) {
		return null;
	}

	return (
		<Stack size={2} variant="div">
			<div className={styles.tabList} role="tablist" aria-label="読み上げ言語">
				{groups.map((group) => {
					const selected = group.value === activeGroup.value;
					return (
						<button
							key={group.value}
							type="button"
							className={styles.tab}
							role="tab"
							id={`speech-lang-tab-${group.value}`}
							aria-selected={selected}
							aria-controls={`speech-lang-panel-${group.value}`}
							tabIndex={selected ? 0 : -1}
							onClick={() => setActiveLang(group.value)}
						>
							{group.label}
						</button>
					);
				})}
			</div>
			<div
				role="tabpanel"
				id={`speech-lang-panel-${activeGroup.value}`}
				aria-labelledby={`speech-lang-tab-${activeGroup.value}`}
			>
				{activeGroup.items.length > 0 ? (
					<CardImageList>
						{activeGroup.items.map((item) => (
							<CardImage key={item.id} id={item.id} href={item.href} title={item.title} />
						))}
					</CardImageList>
				) : (
					<Typography size={2} variant="p" color="dark" weight="normal" align="center">
						まだありません。
					</Typography>
				)}
			</div>
		</Stack>
	);
}
