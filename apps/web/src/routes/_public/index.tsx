import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/sdk/lib/api/factory";
import { FeaturedSection } from "@/sections/featured";
import { NewsSection } from "@/sections/news";
import { NewstickerSection } from "@/sections/newsticker";

export const Route = createFileRoute("/_public/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useQuery(api.query.miforge.ping.queryOptions());

	return (
		<>
			<NewstickerSection />
			<FeaturedSection />
			<NewsSection />
		</>
	);
}
