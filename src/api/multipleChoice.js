import { appConfig } from "../config/appConfig";
import axios from "axios";
import AuthUtils from "../utils/authUtil";

const REL_URL = `${appConfig.SERVER_URL}/multiple-choices`;

export default class MultipleChocieAPI {
	static async getQuiz(uuid) {
		try {
			var response = await axios.get(`${REL_URL}/${uuid}`, AuthUtils.initHeaders("application/json"));
			return response.data;
		} catch (error) {
		}
	}
	static async createQuiz(title, cards) {
		const data = {
			title, questions: cards
		}
		try {
			var response = await axios.post(`${REL_URL}`, data, AuthUtils.initHeaders("application/json"));
			return response.data;
		} catch (error) {
		}
	}

	static async updateQuiz(uuid, title, cards) {
		const data = {
			title, questions: cards
		}
		try {
			var response = await axios.put(`${REL_URL}/${uuid}`, data, AuthUtils.initHeaders("application/json"));
			return response.data;
		} catch (error) {
		}
	}

	static async deleteQuiz(uuid) {
		try {
			var response = await axios.delete(`${REL_URL}/${uuid}`, AuthUtils.initHeaders("application/json"));
			return response.data;
		} catch (error) {
		}
	}
}