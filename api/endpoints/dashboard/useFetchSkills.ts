import { gql, useQuery } from "@apollo/client";

interface Skill {
	amount: number;
	type: string;
}

interface SkillResponse {
	transaction: Skill[];
}

const GET_SKILLS = gql`
	query {
		transaction(where: { type: { _regex: "skill" } }) {
			amount
			type
		}
	}
`;

export function useFetchSkills() {
	return {
		...useQuery<SkillResponse>(GET_SKILLS),
	};
}
