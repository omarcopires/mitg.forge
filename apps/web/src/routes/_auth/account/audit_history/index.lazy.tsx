import { createLazyFileRoute } from "@tanstack/react-router";
import { AccountAuditHistorySection } from "@/sections/account_audit_history";

export const Route = createLazyFileRoute("/_auth/account/audit_history/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AccountAuditHistorySection />;
}
