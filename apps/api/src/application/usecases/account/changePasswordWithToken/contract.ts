import { passwordSchema } from "@miforge/core/schemas";
import z from "zod";

export const ChangePasswordWithTokenContractSchema = {
	input: z
		.object({
			token: z.string().max(100),
			newPassword: passwordSchema,
			confirmPassword: passwordSchema,
		})
		.superRefine(({ confirmPassword, newPassword }, ctx) => {
			if (confirmPassword === newPassword) return;

			ctx.addIssue({
				code: "custom",
				message: "New password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}),
	output: z.void(),
};

export type ChangePasswordWithTokenContractInput = z.infer<
	typeof ChangePasswordWithTokenContractSchema.input
>;

export type ChangePasswordWithTokenContractOutput = z.infer<
	typeof ChangePasswordWithTokenContractSchema.output
>;
