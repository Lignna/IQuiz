import { appConfig } from "../config/appConfig";
import axios from "axios";

const REL_URL = `${appConfig.SERVER_URL}/auth`;

export default class AuthAPI {
	static async handleSignIn(username, password) {
		const data = {username, password}

		try {
			var response = await axios.post(`${REL_URL}/sign-in`, data, appConfig.requestConfig);
			return response.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}

   static async handleSignUp(username, password) {
		const data = {username, password}

		try {
			var response = await axios.post(`${REL_URL}/sign-up`, data, appConfig.requestConfig);
			return response.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}

   static async handleLogout() {
		try {
			var response = await axios.post(`${REL_URL}/logout`, null, appConfig.requestConfig);
			return response.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}

   static async handleChangePassword(username, newPassword) {
		const data = {username, newPassword}

		try {
			var response = await axios.put(`${REL_URL}/password/change`, data, appConfig.requestConfig);
			return response.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}

   static async handleResetPassword(username, newPassword) {
		const data = {username, newPassword}

		try {
			var response = await axios.put(`${REL_URL}/password/reset`, data, appConfig.requestConfig);
			return response.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}

}