import { base } from "@/infra/rpc/base";
import { changeEmailWithPasswordRoute } from "./changeWithPassword";

export const emailRoutes = base.prefix("/email").router({
	changeWithPassword: changeEmailWithPasswordRoute,
});
