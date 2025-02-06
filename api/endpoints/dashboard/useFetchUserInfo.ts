import { gql, QueryHookOptions, useQuery } from "@apollo/client";

interface Params {
	id: number;
}

interface UserInfo {
	id: number;
	login: string;
	firstName: string;
	lastName: string;
	email: string;
	campus: string;
	xps: Array<{ amount: number }>;
}

interface UserInfoResponse {
	user: UserInfo[];
	level: Array<{ amount: number }>;
}

const GET_USER_INFO = gql`
	query getUser($id: Int!) {
		user(where: { id: { _eq: $id } }) {
			id
			login
			firstName
			lastName
			email
			campus
			xps {
				amount
			}
		}
		level: transaction(limit: 1, order_by: { amount: desc }, where: { type: { _eq: "level" } }) {
			amount
		}
	}
`;

export function useFetchUserInfo(params: Params, options?: QueryHookOptions<UserInfoResponse>) {
	return {
		...useQuery<UserInfoResponse>(GET_USER_INFO, { variables: { id: params.id }, ...options }),
	};
}
