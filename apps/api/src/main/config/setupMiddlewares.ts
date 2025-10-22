import { honoCors } from "@/main/middlewares/cors";
import { honoRequestId } from "@/main/middlewares/request_id";
import { requestContextMiddleware } from "../middlewares/local_storage";

export function setupMiddlewares(app: ExtendedHono): void {
	app.use(honoCors());
	app.use(honoRequestId());
	app.use(requestContextMiddleware());
}
