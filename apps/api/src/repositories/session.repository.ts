import { inject, injectable } from "tsyringe";
import { TOKENS } from "@/di/tokens";
import type { Prisma } from "@/infra/clients";
import type { Metadata } from "@/infra/metadata";

@injectable()
export class SessionRepository {
	constructor(
		@inject(TOKENS.Prisma) private readonly prisma: Prisma,
		@inject(TOKENS.Metadata) private readonly metadata: Metadata,
	) {}

	async create({
		accountId,
		expiresAt,
		token,
	}: {
		token: string;
		accountId: number;
		expiresAt: Date;
	}) {
		return this.prisma.miforge_sessions.create({
			data: {
				token: token,
				accountId: accountId,
				expires_at: expiresAt,
				ip: this.metadata.ip(),
			},
		});
	}

	async findByToken(token: string) {
		return this.prisma.miforge_sessions.findUnique({
			where: {
				token,
			},
		});
	}

	async findByAccountId(accountId: number) {
		return this.prisma.miforge_sessions.findMany({
			where: {
				accountId,
			},
		});
	}

	async deleteByToken(token: string) {
		return this.prisma.miforge_sessions.delete({
			where: {
				token,
			},
		});
	}

	async clearAllSessionByAccountId(accountId: number) {
		return this.prisma.miforge_sessions.deleteMany({
			where: {
				accountId,
			},
		});
	}
}
