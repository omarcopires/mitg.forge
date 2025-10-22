import { bool, cleanEnv, str } from "envalid";

export const env = cleanEnv(import.meta.env, {
	BASE_URL: str({
		desc: "Base URL for the application",
	}),
	DEV: bool({
		desc: "Is the application in development mode",
		default: false,
	}),
	PROD: bool({
		desc: "Is the application in production mode",
		default: false,
	}),
	SSR: bool({
		desc: "Is the application in server-side rendering mode",
		default: false,
	}),
	MODE: str({
		choices: ["development", "production", "test"],
		default: "development",
	}),
	VITE_SHOW_DEVTOOLS: bool({
		desc: "Show devtools in development mode",
		default: false,
		devDefault: true,
	}),
	VITE_MIFORGE_RPC_URL: str({
		desc: "The URL of the Miforge RPC server",
	}),
	VITE_MIFORGE_RPC_PATH: str({
		desc: "The path for the Miforge RPC endpoint",
	}),
});
