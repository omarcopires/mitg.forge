import { publicProcedure } from "@/presentation/procedures/public";
import { AccountLoginSchema } from "./schema";

export const loginRoute = publicProcedure
	.route({
		method: "POST",
		path: "/login",
		summary: "Login",
		description: "Authenticate a user and return a session token.",
	})
	.input(AccountLoginSchema.input)
	.output(AccountLoginSchema.output)
	.handler(async ({ context, input }) => {
		return context.services.accounts.login(input);
	});
