import type { Situation } from '@/types';

export const paths = {
	home: '/',
	situations: '/situations',
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
	situation: (id: Situation['id']) => `/situations/${id}`,
	lesson: (id: Situation['id']) => `/situations/${id}/lesson`
} as const;
