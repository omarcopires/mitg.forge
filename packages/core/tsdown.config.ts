import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		geo: "src/geo/index.ts",
		schemas: "src/schemas/index.ts",
	},
	clean: true,
	dts: true,
});
