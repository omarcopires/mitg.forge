import { inject, injectable } from "tsyringe";
import { Catch } from "@/application/decorators/Catch";
import type { Metadata } from "@/domain/modules";
import type { AuditRepository } from "@/domain/repositories";
import { TOKENS } from "@/infra/di/tokens";
import type { PaginationInput } from "@/shared/utils/paginate";

@injectable()
export class AuditService {
	constructor(
		@inject(TOKENS.Metadata) private readonly metadata: Metadata,
		@inject(TOKENS.AuditRepository)
		private readonly auditRepository: AuditRepository,
	) {}

	@Catch()
	auditHistoryBySession({ pagination }: { pagination: PaginationInput }) {
		const session = this.metadata.session();

		return this.auditRepository.findAuditsByAccountId(session.id, pagination);
	}
}
