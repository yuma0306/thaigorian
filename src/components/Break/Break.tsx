import styles from './Break.module.css';

type Props = {
	media: 'onlySp' | 'onlyPc';
};

export function Break({ media }: Props) {
	return <br className={styles.break} data-media={media} />;
}
