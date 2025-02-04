"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
	});

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
