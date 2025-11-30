import { createHmac } from "node:crypto";
import { injectable } from "tsyringe";
import { env } from "@/infra/env";

@injectable()
export class TokenHasher {
	private readonly secret = env.JWT_SECRET;

	hash(token: string): string {
		return createHmac("sha256", this.secret).update(token).digest("hex");
	}

	verifyAndReturnHash(token: string, hash: string): string | null {
		const computed = this.hash(token);

		if (computed !== hash) {
			return null;
		}

		return computed;
	}
}
