import { appConfig } from "../config/appConfig";
import axios from "axios";

const REL_URL = `${appConfig.SERVER_URL}`;

export default class WebAPI {
	static async getHomeData() {

		try {
			var response = await axios.get(`${REL_URL}/home`, appConfig.requestConfig);
			return response.data.data;
		} catch (error) {
			// throw AppErrorUtils.classifyError(error);
		}
	}
}