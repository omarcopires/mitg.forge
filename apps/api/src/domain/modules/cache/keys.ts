import { injectable } from "tsyringe";
import { env } from "@/infra/env";

type KeyPart = string | number | null | undefined | false;

@injectable()
export class CacheKeys {
	private readonly appPrefix = env.SERVICE_NAME;

	private buildKey(...parts: KeyPart[]): string {
		return parts
			.filter(Boolean)
			.map((part) => String(part).trim())
			.map((p) => p.replace(/\s+/g, "-"))
			.join(":");
	}

	private namespace = {
		build: (...parts: KeyPart[]) => this.buildKey(this.appPrefix, ...parts),
	};

	readonly keys = {
		test: (id: string) => this.namespace.build("test", id),
	};
}
