import { passwordSchema, simplePasswordSchema } from "@miforge/core/schemas";
import z from "zod";

export const ChangePasswordWithOldContractSchema = {
	input: z
		.object({
			oldPassword: simplePasswordSchema,
			newPassword: passwordSchema,
			confirmPassword: passwordSchema,
		})
		.superRefine(({ confirmPassword, newPassword, oldPassword }, ctx) => {
			if (oldPassword === newPassword) {
				ctx.addIssue({
					code: "custom",
					message: "New password must be different from old password",
					path: ["newPassword"],
				});
			}

			if (confirmPassword === newPassword) return;

			ctx.addIssue({
				code: "custom",
				message: "New password and confirm password do not match",
				path: ["confirmPassword"],
			});
		}),
	output: z.void(),
};

export type ChangePasswordWithOldContractInput = z.infer<
	typeof ChangePasswordWithOldContractSchema.input
>;

export type ChangePasswordWithOldContractOutput = z.infer<
	typeof ChangePasswordWithOldContractSchema.output
>;
