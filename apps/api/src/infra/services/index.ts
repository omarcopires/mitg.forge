import type { DependencyContainer } from "tsyringe";
import { TOKENS } from "@/di/tokens";
import type { AccountsService, TibiaClientService } from "@/domain";
import type { Logger } from "@/infra/logging/logger";

export class Services {
	constructor(private readonly di: DependencyContainer) {}

	get tibiaClient() {
		return this.di.resolve<TibiaClientService>(TOKENS.TibiaClientService);
	}

	get accounts() {
		return this.di.resolve<AccountsService>(TOKENS.AccountsService);
	}

	get logger() {
		return this.di.resolve<Logger>(TOKENS.Logger);
	}
}
