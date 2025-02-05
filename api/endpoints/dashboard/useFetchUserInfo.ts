import { gql, useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";

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

export function useFetchUserInfo() {
	const { user } = useAuth();

	const GET_USER_INFO = gql`
		query {
			user {
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
			level: transaction(
              limit: 1
              order_by: { amount: desc }
              where: { userId: { _eq: ${user?.id} }, type: { _eq: "level" } }
      ) {
         amount
    	}
		}
	`;

	return {
		...useQuery<UserInfoResponse>(GET_USER_INFO),
	};
}
