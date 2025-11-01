import { getConnInfo } from "hono/bun";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "@/di/tokens";

@injectable()
export class Metadata {
	constructor(@inject(TOKENS.Context) private readonly context: ReqContext) {}

	public ip(): string | null {
		const info = getConnInfo(this.context);
		const possibleIpHeaders = [
			"remoteAddress",
			"x-forwarded-for",
			"cf-connecting-ip",
			"x-real-ip",
			"fastly-client-ip",
			"true-client-ip",
			"x-client-ip",
		];

		if (info.remote.address) {
			return info.remote.address;
		}

		return possibleIpHeaders.reduce<string | null>((foundIp, header) => {
			if (foundIp) return foundIp;
			const ip = this.context.req.header(header);
			return ip ?? null;
		}, null);
	}

	public userAgent(): string | null {
		return this.context.req.header("user-agent") ?? null;
	}

	public requestId(): string | null {
		return this.context.get("requestId") ?? null;
	}
}
