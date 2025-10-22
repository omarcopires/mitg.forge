import type { AppRouterClient as MiforgeRouterClient } from "@miforge/api/orpc";
import { createORPCClient } from "@orpc/client";
import { miforgeLink } from "./links/miforge";

export const client = {
	miforge: createORPCClient(miforgeLink),
} as {
	miforge: MiforgeRouterClient;
};
