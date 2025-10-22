import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client } from "./clients";

export const api = {
	client: client,
	query: {
		miforge: createTanstackQueryUtils(client.miforge, {
			path: ["miforge"],
		}),
	},
};
