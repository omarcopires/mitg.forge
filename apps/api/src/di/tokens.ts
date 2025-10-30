import type { InjectionToken } from "tsyringe";
import type { TibiaClientService } from "@/domain";
import type { Prisma } from "@/infra/clients";
import type { HasherCrypto } from "@/infra/crypto/hasher";
import type { Logger, RootLogger } from "@/infra/logging/logger";
import type { AccountRepository, PlayersRepository } from "@/repositories";

export const token = <T>(desc: string) => Symbol(desc) as InjectionToken<T>;

export const TOKENS = {
	// context
	ReqContext: token<ReqContext>("ReqContext"),

	// Logger
	Logger: token<Logger>("Logger"),
	RootLogger: token<RootLogger>("RootLogger"),

	// Clients
	Prisma: token<Prisma>("Prisma"),

	// Crypto
	HasherCrypto: token<HasherCrypto>("HasherCrypto"),

	// Repositories
	AccountRepository: token<AccountRepository>("AccountRepository"),
	PlayersRepository: token<PlayersRepository>("PlayersRepository"),

	// Services
	TibiaClientService: token<TibiaClientService>("TibiaClientService"),
} as const;
