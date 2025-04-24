import { appConfig } from "../config/appConfig";

export default class AuthUtils {
	static initHeaders(contentType) {
		return {
			...appConfig.requestConfig,
			headers: {
				...appConfig.requestConfig.headers,
				...(contentType && { "Content-Type": contentType })
			}
		};
	}
}