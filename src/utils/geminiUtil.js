import { GoogleGenAI } from "@google/genai";

export default class GeminiUtil {
	static async generateQuiz(quizType, topic, questionCount) {
		const ai = new GoogleGenAI({
		apiKey: "AIzaSyCHceUqklh-ltV5svS8-YhKmgRLVJMgU0s",
		});
		const config = {
			responseMimeType: 'application/json',
		};

		const model = 'gemini-1.5-flash-8b';
		const prompt = quizType === "flashcard" ?
			`Suggest ${questionCount} flashcard questions for topic: "${topic}" followed structure of an array of {"front", "back"}`:
			`Suggest ${questionCount} multiple questions for topic: "${topic}" followed structure of an array of {"question", "correctOpt", "opt1", "opt2", "opt3"...}`

		const contents = [
		{
			role: 'user',
			parts: [
				{
				text: prompt,
				},
			],
		},
		];

		const stream = await ai.models.generateContentStream({
		model,
		config,
		contents,
		});

		let fullResponse = "";

		for await (const chunk of stream) {
			fullResponse += chunk.text;
		}

		// Try parsing the JSON
		try {
			const quizObject = JSON.parse(fullResponse);
			return quizObject;
		} catch (err) {
			console.error("Error parsing JSON from Gemini:", err);
			return null;
		}
	}
}