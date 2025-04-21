// import { appConfig } from "@/config/appConfig";
// import { HTTP_CONTENT_TYPE } from "@/enum";
// import { AppResponse } from "@/types";
// import { AppErrorUtils } from "@/utils";
// import AuthUtils from "@/utils/AuthUtils";
// import axios from "axios";

// const REL_URL = `${appConfig.SERVER_URL}/auth`;

// export default class AuthAPI {
// 	static async handleSignIn(authorization: string | null | null) {
// 		const data = new FormData();
// 		data.append("authorization", `Bearer ${authorization}`);

// 		try {
// 			var response = await axios.post<AppResponse>(`${REL_URL}/sign-in`, data, AuthUtils.initHeaders(HTTP_CONTENT_TYPE.FORM_DATA, null));
// 			return response.data;
// 		} catch (error: any) {
// 			throw AppErrorUtils.classifyError(error);
// 		}
// 	}

// 	static async checkPreSignUp(authorization: string | null) {
// 		try {
// 			var response = await axios.post<AppResponse>(REL_URL + "/pre-sign-up-checking", null, AuthUtils.initHeaders(null, authorization));
// 			return response.data;
// 		} catch (error: any) {
// 			throw AppErrorUtils.classifyError(error);
// 		}
// 	}
// }