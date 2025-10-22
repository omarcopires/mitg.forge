import { QueryClient as TansStackQueryClient } from "@tanstack/react-query";

const makeQueryClient = () => {
	return new TansStackQueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				retry: false,
				refetchOnWindowFocus: false,
				experimental_prefetchInRender: true,
			},
			mutations: {
				retry: false,
			},
		},
	});
};

let browserQueryClient: TansStackQueryClient | undefined;
export function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

export type QueryClient = ReturnType<typeof getQueryClient>;
