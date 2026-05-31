export const paths = {
	home: '/',
	phrases: '/phrases',
	login: '/login',
	signup: '/signup',
	member: '/member',
	memberPhrases: '/member/phrases',
	memberPhrasesRegister: '/member/phrases/register',
	logout: '/logout',
	authCallback: '/auth/callback',
	memberPhrasesDetail: (id: string) => `/member/phrases/${id}`,
	myPhrase: (id: string) => `/my-phrases/${id}`,
	myPhraseLesson: (id: string) => `/my-phrases/${id}/lesson`,
	phrase: (id: string) => `/phrases/${id}`,
	phraseLesson: (id: string) => `/phrases/${id}/lesson`
} as const;
