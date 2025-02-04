import axios from "axios";

export const useAxiosClient = () => {
	const client = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL,
		timeout: 600000 * 10,
	});

	return client;
};
