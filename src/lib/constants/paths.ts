import type { Situation, Exam } from '@/lib/types';

export const paths = {
	home: '/',
	situations: '/situations',
	situation: (id: Situation['id']) => `/situations/${id}`,
	lesson: (id: Situation['id']) => `/situations/${id}/lesson`,
	exams: '/exams',
	exam: (id: Exam['id']) => `/exams/${id}`,
	examLesson: (id: Exam['id']) => `/exams/${id}/lesson`
} as const;
