import { base } from "@/main/rpc/base";
import { loginRoute } from "./login";

export const accountsRouter = base.prefix("/accounts").tag("Accounts").router({
	login: loginRoute,
});
