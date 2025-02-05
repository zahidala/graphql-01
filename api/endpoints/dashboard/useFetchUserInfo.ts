import { gql, useQuery } from "@apollo/client";

const GET_USER_INFO = gql`
	query {
		user {
			id
			login
			firstName
			lastName
			email
			campus
		}
	}
`;

interface UserInfo {
	__typename: string;
	id: number;
	login: string;
	firstName: string;
	lastName: string;
	email: string;
	campus: string;
}

interface UserInfoResponse {
	user: UserInfo[];
}

export function useFetchUserInfo() {
	return {
		...useQuery<UserInfoResponse>(GET_USER_INFO),
	};
}
