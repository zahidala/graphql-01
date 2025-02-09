import { gql, QueryHookOptions, useQuery } from "@apollo/client";

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
	return useQuery<AuditInfoResponse>(GET_AUDIT_INFO, { variables: { id: params.id }, ...options });
}
