import { useState } from 'react';

export function useThaiVisibility() {
	const [hideThai, setHideThai] = useState(false);
	const [hideMeaning, setHideMeaning] = useState(false);

	function toggleHideThai() {
		setHideThai((current) => !current);
		setHideMeaning(false);
	}

	function toggleHideMeaning() {
		setHideMeaning((current) => !current);
		setHideThai(false);
	}

	return {
		hideThai,
		hideMeaning,
		toggleHideThai,
		toggleHideMeaning
	};
}
