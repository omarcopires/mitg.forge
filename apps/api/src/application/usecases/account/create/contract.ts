import { passwordSchema } from "@miforge/core/schemas";
import z from "zod";

export const AccountCreateContractSchema = {
	input: z
		.object({
			name: z.string().min(3).max(30).optional(),
			email: z.email(),
			password: passwordSchema,
			confirmPassword: passwordSchema,
		})
		.superRefine(({ confirmPassword, password }, ctx) => {
			if (confirmPassword === password) return;

			ctx.addIssue({
				code: "custom",
				message: "Password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}),
	output: z.void(),
};

export type AccountCreateContractInput = z.infer<
	typeof AccountCreateContractSchema.input
>;
export type AccountCreateContractOutput = z.infer<
	typeof AccountCreateContractSchema.output
>;
