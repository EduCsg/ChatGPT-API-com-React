import "./App.css";

import axios from "axios";
import { useState } from "react";

const Body = () => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");

	const [disable, setDisable] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const client = axios.create({
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
		},
	});

	const sendRequest = () => {
		const params = {
			model: "text-davinci-003",
			prompt: question,
			max_tokens: 2048,
			temperature: 0.5,
		};

		setIsLoading(true);
		setDisable(true);
		setQuestion("Aguarde...");

		// requisicao com o question
		client
			.post("https://api.openai.com/v1/completions", params)
			.then((res) => {
				setIsLoading(false);
				setDisable(false);
				setAnswer(res.data.choices[0].text);
				setQuestion("");
			})
			.catch((err) => {
				setAnswer("Houve um erro, tente novamente!");
				setIsLoading(false);
				setDisable(false);
				setQuestion("");
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		sendRequest();
	};

	return (
		<>
			{answer.length <= 0 ? (
				<textarea
					name="answer"
					id="answer"
					className="answer"
					disabled
					value={"Pergunte qualquer coisa!"}
				></textarea>
			) : (
				<textarea
					name="answer"
					id="answer"
					className="answer"
					disabled
					value={answer}
				></textarea>
			)}

			<form onSubmit={handleSubmit}>
				<div className="question-container">
					<input
						type="text"
						className="question"
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
						disabled={disable}
					/>

					{isLoading && <button disabled>Aguarde...</button>}
					{!isLoading && <button type="submit">Enviar</button>}
				</div>
			</form>
		</>
	);
};

export default Body;
