import type z from "zod";
import { AccountAudit } from "@/shared/schemas/AccountAudit";
import { createPaginateSchema, InputPageSchema } from "@/shared/utils/paginate";

export const AccountAuditHistoryContractSchema = {
	input: InputPageSchema,
	output: createPaginateSchema(
		AccountAudit.omit({
			success: true,
			errorCode: true,
			metadata: true,
			accountId: true,
		}),
	),
};

export type AccountAuditHistoryContractInput = z.infer<
	typeof AccountAuditHistoryContractSchema.input
>;
export type AccountAuditHistoryContractOutput = z.input<
	typeof AccountAuditHistoryContractSchema.output
>;
