import { AsyncLocalStorage } from "node:async_hooks";

interface RequestContext {
	requestId: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export const requestContextMiddleware = () => {
	return (context: ReqContext, next: () => Promise<void>) => {
		const requestId = context.get("requestId");

		return requestContext.run({ requestId }, async () => {
			await next();
		});
	};
};
