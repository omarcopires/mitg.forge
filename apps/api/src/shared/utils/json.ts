export const safeStringify = (value: unknown): string => {
	return JSON.stringify(value, (_key, val) => {
		if (typeof val === "bigint") {
			return val.toString();
		}
		return val;
	});
};
