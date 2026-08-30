import { useState } from 'react';

export function useThaiVisibility() {
	const [hideThai, setHideThai] = useState(false);
	const [hideMeaning, setHideMeaning] = useState(false);

	function toggleHideThai() {
		setHideThai((current) => !current);
	}

	function toggleHideMeaning() {
		setHideMeaning((current) => !current);
	}

	return {
		hideThai,
		hideMeaning,
		toggleHideThai,
		toggleHideMeaning
	};
}
