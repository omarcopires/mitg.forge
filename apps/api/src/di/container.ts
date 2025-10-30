import { container, type DependencyContainer, Lifecycle } from "tsyringe";
import { TOKENS } from "@/di/tokens";
import { TibiaClientService } from "@/domain";
import { env } from "@/env";
import { makePrisma, type Prisma } from "@/infra/clients";
import { HasherCrypto } from "@/infra/crypto/hasher";
import { RootLogger } from "@/infra/logging/logger";
import { makeRequestLogger } from "@/infra/logging/request-logger";
import { AccountRepository, PlayersRepository } from "@/repositories";

declare global {
	var __PRISMA__: Prisma | undefined;
	var __BOOTSTRAPPED__: boolean | undefined;
}

export function bootstrapContainer() {
	if (env.isDev) {
		container.clearInstances();
	}

	const rootLogger = new RootLogger({
		level: env.LOG_LEVEL,
		base: { service: env.SERVICE_NAME },
	});

	const prisma: Prisma = global.__PRISMA__ ?? makePrisma(rootLogger);
	if (env.isDev) {
		global.__PRISMA__ = prisma;
	}

	container.registerInstance(TOKENS.RootLogger, rootLogger);
	container.registerInstance(TOKENS.Prisma, prisma);

	// Registrations “globais” que não dependem de request:
	container.register(
		TOKENS.HasherCrypto,
		{ useClass: HasherCrypto },
		{ lifecycle: Lifecycle.Singleton },
	);

	global.__BOOTSTRAPPED__ = true;
	return container;
}

export function createRequestContainer(
	context: ReqContext,
): DependencyContainer {
	const childContainer = container.createChildContainer();

	childContainer.register<ReqContext>(TOKENS.ReqContext, { useValue: context });

	// Logger (scoped per request)
	const rootLogger = childContainer.resolve<RootLogger>(TOKENS.RootLogger);
	childContainer.registerInstance(
		TOKENS.Logger,
		makeRequestLogger(rootLogger, context),
	);

	// Repositórios (scoped per request)
	childContainer.register(
		TOKENS.AccountRepository,
		{ useClass: AccountRepository },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);
	childContainer.register(
		TOKENS.PlayersRepository,
		{ useClass: PlayersRepository },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);

	// Serviços de domínio (scoped per request)
	childContainer.register(
		TOKENS.TibiaClientService,
		{ useClass: TibiaClientService },
		{ lifecycle: Lifecycle.ResolutionScoped },
	);

	return childContainer;
}
