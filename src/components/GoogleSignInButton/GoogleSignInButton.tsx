import Image from 'next/image';
import styles from './GoogleSignInButton.module.css';

export type GoogleSignInButtonMode = 'signin' | 'signup';

export function GoogleSignInButton({
	mode,
	disabled
}: {
	mode: GoogleSignInButtonMode;
	disabled: boolean;
}) {
	const { src, alt } = buttonAssets[mode];
	return (
		<button className={styles.button} type="submit" disabled={disabled}>
			<Image className={styles.image} src={src} alt={alt} width={220} height={49} />
		</button>
	);
}

const buttonAssets: Record<GoogleSignInButtonMode, { src: string; alt: string }> = {
	signin: {
		src: '/sign-in-with-google.png',
		alt: 'Googleでログイン'
	},
	signup: {
		src: '/sign-up-with-google.png',
		alt: 'Googleで会員登録'
	}
} as const;
