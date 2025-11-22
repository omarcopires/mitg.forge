import { AccountAuditHistoryContractSchema } from "@/application/usecases/account/audit/contract";
import { isAuthenticatedProcedure } from "@/presentation/procedures/isAuthenticated";

export const auditHistoryRoute = isAuthenticatedProcedure
	.route({
		method: "GET",
		path: "/audit",
		summary: "Audit History",
		description:
			"Retrieve a list of audit logs associated with the authenticated user's account.",
	})
	.input(AccountAuditHistoryContractSchema.input)
	.output(AccountAuditHistoryContractSchema.output)
	.handler(async ({ context, input }) => {
		return context.usecases.account.auditHistory.execute(input);
	});
