"use client";

import { AuthProvider } from "@/contexts/AuthContext";
// import { composeProviders } from "@/utils/compose-providers";
import { ApolloClientProvider } from "./ApolloClientProvider";
import { Navbar } from "@/components/layout/Navbar";
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

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ApolloClientProvider>
						<Navbar />
						{children}
						<Toaster />
					</ApolloClientProvider>
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
