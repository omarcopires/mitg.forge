import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_public/terms/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello /public/terms/!</div>;
}
