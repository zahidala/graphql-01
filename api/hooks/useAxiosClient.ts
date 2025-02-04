import axios from "axios";

export const useAxiosClient = () => {
	const client = axios.create({
		baseURL: "https://learn.reboot01.com/api",
		timeout: 600000 * 10,
	});

	return client;
};
