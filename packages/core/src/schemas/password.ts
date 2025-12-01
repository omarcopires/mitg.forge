import z from "zod";

/**
 * TODO: Maybe in the future when implement i18n, we can localize these messages,
 * using a centralized package for all messages.
 * But will need to figure out how to pass locale info to schema.
 */
export const passwordSchema = z
	.string()
	.min(8)
	.max(100)
	.regex(/[A-Z]/, {
		message: "Password must contain at least one uppercase letter",
	})
	.regex(/[\W_]/, {
		message: "Password must contain at least one special character",
	});

export const simplePasswordSchema = z.string().min(1).max(100);
