export let appConfig = {
	WEB_NAME: "IQuiz",
	SERVER_URL: "http://localhost:8080/api",
	requestConfig: {
		headers: {
			"Accept": "application/json",
		},
		withCredentials: true,
		timeout: 15000
	}
};