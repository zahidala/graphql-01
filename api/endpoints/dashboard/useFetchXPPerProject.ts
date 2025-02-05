import { gql, useQuery } from "@apollo/client";

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

export function useFetchXPPerProject() {
	return {
		...useQuery<XPPerProjectResponse>(GET_XP_PER_PROJECT),
	};
}
