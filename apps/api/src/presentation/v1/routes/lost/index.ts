import { base } from "@/infra/rpc/base";
import { findByEmailOrCharacterNameRoute } from "./findByEmail";
import { generatePasswordResetRoute } from "./generatePasswordReset";
import { resetPasswordWithTokenRoute } from "./resetPasswordWithToken";
import { validConfirmationTokenRoute } from "./validConfirmationToken";

export const lostAccountRouter = base
	.tag("Lost Account")
	.prefix("/lost")
	.router({
		findByEmail: findByEmailOrCharacterNameRoute,
		generatePasswordReset: generatePasswordResetRoute,
		resetPasswordWithToken: resetPasswordWithTokenRoute,
		validConfirmationToken: validConfirmationTokenRoute,
	});
