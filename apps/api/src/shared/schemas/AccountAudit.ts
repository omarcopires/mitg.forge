import z from "zod";

export const AccountAudit = z.object({
	id: z.number(),
	action: z.string(),
	details: z.string().nullable(),
	ip: z.string().nullable(),
	userAgent: z.string().nullable(),
	success: z.boolean(),
	errorCode: z.string().nullable(),
	requestId: z.string().nullable(),
	metadata: z.record(z.string(), z.any()).nullable(),
	accountId: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type AccountAudit = z.infer<typeof AccountAudit>;
