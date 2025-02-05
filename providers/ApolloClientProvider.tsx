import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";

export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useAuth();

	const apolloClient = useMemo(() => {
		return new ApolloClient({
			cache: new InMemoryCache(),
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
			},
			uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
		});
	}, [token]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
