import { gql, QueryHookOptions, useQuery } from "@apollo/client";

interface XPPerProject {
	amount: number;
	object: { name: string };
}

interface XPPerProjectResponse {
	transaction: XPPerProject[];
}

const GET_XP_PER_PROJECT = gql`
	query {
		transaction(
			where: {
				type: { _eq: "xp" }
				_and: [
					{ path: { _like: "/bahrain/bh-module%" } }
					{ path: { _nlike: "/bahrain/bh-module/checkpoint%" } }
					{ path: { _nlike: "/bahrain/bh-module/piscine%" } }
					{ amount: { _gt: 0 } }
				]
			}
			order_by: { createdAt: desc }
			limit: 5
		) {
			amount
			object {
				name
			}
		}
	}
`;

export function useFetchXPPerProject(options?: QueryHookOptions<XPPerProjectResponse>) {
	return useQuery<XPPerProjectResponse>(GET_XP_PER_PROJECT, options);
}
