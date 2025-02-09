import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";

export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
	const { token, logout } = useAuth();

	const apolloClient = useMemo(() => {
		const httpLink = new HttpLink({
			uri: "https://learn.reboot01.com/api/graphql-engine/v1/graphql",
		});

		const errorLink = onError(({ graphQLErrors }) => {
			if (graphQLErrors) {
				graphQLErrors.forEach(({ message }) => {
					if (message === "Could not verify JWT: JWTExpired") {
						logout();
					}
				});
			}
		});

		const authLink = new ApolloLink((operation, forward) => {
			operation.setContext({
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
			});
			return forward(operation);
		});

		return new ApolloClient({
			link: ApolloLink.from([errorLink, authLink, httpLink]),
			cache: new InMemoryCache(),
		});
	}, [token]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
