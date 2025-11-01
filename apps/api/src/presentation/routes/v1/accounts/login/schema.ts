import z from "zod";

export const AccountLoginSchema = {
	input: z.object({
		email: z.email(),
		password: z.string().min(1),
	}),
	output: z.object({
		token: z.string(),
	}),
};

export type AccountLoginInput = z.infer<typeof AccountLoginSchema.input>;
export type AccountLoginOutput = z.infer<typeof AccountLoginSchema.output>;
