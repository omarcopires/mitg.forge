import { inject, injectable } from "tsyringe";
import type { Prisma } from "@/domain/clients";
import type { Logger, Metadata } from "@/domain/modules";
import { TOKENS } from "@/infra/di/tokens";
import { safeStringify } from "@/shared/utils/json";
import type { PaginationInput } from "@/shared/utils/paginate";

@injectable()
export class AuditRepository {
	constructor(
		@inject(TOKENS.Logger) private readonly logger: Logger,
		@inject(TOKENS.Prisma) private readonly database: Prisma,
		@inject(TOKENS.Metadata) private readonly metadata: Metadata,
	) {}

	async findAuditsByAccountId(accountId: number, opts?: PaginationInput) {
		const page = opts?.page ?? 1;
		const size = opts?.size ?? 20;

		const [audits, total] = await Promise.all([
			this.database.miforge_account_audit.findMany({
				where: {
					accountId: accountId,
				},
				orderBy: {
					created_at: "desc",
				},
				skip: (page - 1) * size,
				take: size,
			}),
			this.database.miforge_account_audit.count({
				where: {
					accountId: accountId,
				},
			}),
		]);

		return {
			audits,
			total,
		};
	}

	async createAudit(
		action: keyof typeof AuditAction,
		data?: {
			success?: boolean;
			metadata?: Record<string, unknown>;
			errorCode?: string;
			details?: string;
		},
	): Promise<void> {
		try {
			const session = this.metadata.session();
			const requestId = this.metadata.requestId();
			const ip = this.metadata.ip();
			const agent = this.metadata.userAgent();

			await this.database.miforge_account_audit.create({
				data: {
					accountId: session.id,
					action,
					ip,
					requestId,
					userAgent: agent,
					metadata: data?.metadata ? safeStringify(data.metadata) : undefined,
					success: data?.success,
					errorCode: data?.errorCode,
					details: data?.details,
				},
			});
		} catch (error) {
			console.log(error);
			this.logger.warn("Failed to create audit log entry", {
				error: (error as Error).message,
			});
			return;
		}
	}
}

const AuditAction = {
	DELETED_CHARACTER: "DELETED_CHARACTER",
	UNDELETE_CHARACTER: "UNDELETE_CHARACTER",
	UPDATED_CHARACTER: "UPDATED_CHARACTER",
	CREATED_CHARACTER: "CREATED_CHARACTER",
} as const;
