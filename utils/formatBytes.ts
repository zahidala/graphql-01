export const formatBytes = (bytes: number): string => {
	if (bytes < 1000) {
		return `${bytes} bytes`;
	}

	const kb = bytes / 1000;
	if (kb < 1000) {
		return `${Math.round(kb)} kB`;
	}

	const mb = kb / 1000;
	return `${mb.toFixed(2)} MB`;
};
