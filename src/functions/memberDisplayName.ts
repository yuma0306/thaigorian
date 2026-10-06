import type { User } from '@supabase/supabase-js';
import type { ProfileRow } from '@/types/database';

export function getMemberDisplayName(profile: ProfileRow | null, user: User | null) {
	return profile?.name ?? user?.user_metadata.full_name ?? user?.user_metadata.name ?? 'Member';
}

export function getMemberEmail(profile: ProfileRow | null, user: User | null) {
	return profile?.email ?? user?.email ?? '';
}
