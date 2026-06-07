import { useState } from 'react';

export function useThaiVisibility() {
	const [hideThai, setHideThai] = useState(false);

	function toggleHideThai() {
		setHideThai((current) => !current);
	}

	return {
		hideThai,
		toggleHideThai
	};
}
