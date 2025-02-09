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
	xp: { aggregate: { sum: { amount: number } } };
}

interface UserInfoResponse {
	user_by_pk: UserInfo;
	level: Array<{ amount: number }>;
}

const GET_USER_INFO = gql`
	query getUserInfo($id: Int!) {
		user_by_pk(id: $id) {
			id
			login
			firstName
			lastName
			email
			campus
			xp: transactions_aggregate(where: { type: { _eq: "xp" } }) {
				aggregate {
					sum {
						amount
					}
				}
			}
		}
		level: transaction(limit: 1, order_by: { amount: desc }, where: { type: { _eq: "level" } }) {
			amount
		}
	}
`;

export function useFetchUserInfo(params: Params, options?: QueryHookOptions<UserInfoResponse>) {
	return useQuery<UserInfoResponse>(GET_USER_INFO, { variables: { id: params.id }, ...options });
}
