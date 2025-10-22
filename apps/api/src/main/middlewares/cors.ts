import { cors } from "hono/cors";

const allowedOrigins = new Set(["http://localhost:3000"]);

export function honoCors() {
	return cors({
		origin: (origin) => (origin && allowedOrigins.has(origin) ? origin : ""),
		credentials: true,
	});
}
