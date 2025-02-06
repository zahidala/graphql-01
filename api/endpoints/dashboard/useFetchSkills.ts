import { gql, useQuery } from "@apollo/client";

interface Skill {
	amount: number;
	type: string;
}

interface User {
	transactions: Skill[];
}

interface SkillResponse {
	user: User[];
}

const GET_SKILLS = gql`
	query {
		user {
			transactions(where: { type: { _ilike: "%skill%" } }, order_by: { amount: desc }) {
				type
				amount
			}
		}
	}
`;

export function useFetchSkills() {
	return {
		...useQuery<SkillResponse>(GET_SKILLS),
	};
}
