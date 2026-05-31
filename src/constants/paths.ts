import type { Situation } from '@/types';

export const paths = {
	home: '/',
	phrases: '/phrases',
	login: '/login',
	signup: '/signup',
	member: '/member',
	memberCategory: '/member/category',
	myCategoryRegister: '/member/category/register',
	logout: '/logout',
	authCallback: '/auth/callback',
	memberCategoryDetail: (id: string) => `/member/category/${id}`,
	myPhrase: (id: string) => `/my-phrases/${id}`,
	myPhraseLesson: (id: string) => `/my-phrases/${id}/lesson`,
	phrase: (id: Situation['id']) => `/phrases/${id}`,
	phraseLesson: (id: Situation['id']) => `/phrases/${id}/lesson`
} as const;
