import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";

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

export function useFetchSkills(options?: QueryHookOptions<SkillResponse>) {
	const { logout } = useAuth();

	return useQuery<SkillResponse>(GET_SKILLS, {
		onError: error => {
			if (error.message === "Could not verify JWT: JWTExpired") {
				logout();
			}

			options?.onError?.(error);
		},
		...options,
	});
}
