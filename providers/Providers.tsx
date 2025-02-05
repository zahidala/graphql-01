"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthProvider } from "@/contexts/AuthContext";
// import { composeProviders } from "@/utils/compose-providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const queryClient = new QueryClient();
	queryClient.setDefaultOptions({
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	});

	const apolloClient = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
	});

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ApolloProvider client={apolloClient}>
						{children}
						<Toaster />
					</ApolloProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

// export Providers = composeProviders([
// 	[ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true }],
// 	[ReactQueryProvider],
// 	[AuthProvider],
// 	[ApolloClientProvider],
// 	[ToasterProvider],
// ])
