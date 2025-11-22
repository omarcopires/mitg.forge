import { inject, injectable } from "tsyringe";
import type { AuditService } from "@/application/services";
import type { Pagination } from "@/domain/modules";
import { TOKENS } from "@/infra/di/tokens";
import type { UseCase } from "@/shared/interfaces/usecase";
import type {
	AccountAuditHistoryContractInput,
	AccountAuditHistoryContractOutput,
} from "./contract";

@injectable()
export class AuditAccountUseCase
	implements
		UseCase<AccountAuditHistoryContractInput, AccountAuditHistoryContractOutput>
{
	constructor(
		@inject(TOKENS.AuditService) private readonly auditService: AuditService,
		@inject(TOKENS.Pagination) private readonly pagination: Pagination,
	) {}

	async execute(
		input: AccountAuditHistoryContractInput,
	): Promise<AccountAuditHistoryContractOutput> {
		const { audits, total } = await this.auditService.auditHistoryBySession({
			pagination: input,
		});

		return this.pagination.paginate(
			audits.map((audit) => {
				return {
					...audit,
					metadata:
						typeof audit.metadata === "string"
							? JSON.parse(audit.metadata)
							: null,
					updatedAt: audit.updated_at,
					createdAt: audit.created_at,
				};
			}),
			{
				page: input.page ?? 1,
				size: input.size ?? 10,
				total,
			},
		);
	}
}
