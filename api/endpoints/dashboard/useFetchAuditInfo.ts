import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";

interface Params {
	id: number;
}

interface AuditInfo {
	totalUp: number;
	totalDown: number;
	auditRatio: number;
}

interface AuditInfoResponse {
	user_by_pk: AuditInfo;
}

const GET_AUDIT_INFO = gql`
	query GetAuditInfo($id: Int!) {
		user_by_pk(id: $id) {
			auditRatio
			totalUp
			totalDown
		}
	}
`;

export function useFetchAuditInfo(params: Params, options?: QueryHookOptions<AuditInfoResponse>) {
	const { logout } = useAuth();

	return useQuery<AuditInfoResponse>(GET_AUDIT_INFO, {
		variables: { id: params.id },
		onError: error => {
			if (error.message === "Could not verify JWT: JWTExpired") {
				logout();
			}

			options?.onError?.(error);
		},
		...options,
	});
}
