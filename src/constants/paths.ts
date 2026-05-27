import type { Situation } from '@/types';

export const paths = {
	home: '/',
	situations: '/situations',
	login: '/login',
	signup: '/signup',
	member: '/member',
	logout: '/logout',
	authCallback: '/auth/callback',
	situation: (id: Situation['id']) => `/situations/${id}`,
	lesson: (id: Situation['id']) => `/situations/${id}/lesson`
} as const;
