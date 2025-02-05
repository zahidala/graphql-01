import { AxiosError } from "axios";
import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

type APIError = {
	error: string;
};

export type MutationOptions<Response, Args = void> = UseMutationOptions<Response, AxiosError<APIError>, Args, any>;
export type QueryOptions<Response> = UseQueryOptions<Response, AxiosError<APIError>, Response, any>;
