import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgetPassword from '../pages/auth/ForgetPassword';
import Home from '../pages/home/Home';
import CreateMCQ from '../pages/quiz/CreateMCQ';
import CreateFlashcard from '../pages/quiz/CreateFlashcard';
import DoMCQ from '../pages/quiz/DoMCQ';
import DoFlashcard from '../pages/quiz/DoFlashcard';
import Cookies from "js-cookie"

const AppRoutes = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const username = Cookies.get("username");

		if (!username) {
			navigate("/sign-in");
			return;
		}
	}, []);

	return (
		<Routes>
			<Route path="" element={<SignIn />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/forget-password" element={<ForgetPassword />} />
			<Route path="/sign-up" element={<SignUp />} />
			<Route path="/home" element={<Home />} />
			<Route path="/create-mcq" element={<CreateMCQ />} />
			<Route path="/create-flashcard" element={<CreateFlashcard />} />
			<Route path="/create-mcq/:uuid" element={<CreateMCQ />} />
			<Route path="/create-flashcard/:uuid" element={<CreateFlashcard />} />
			<Route path="/mcqs/:uuid" element={<DoMCQ />} />
			<Route path="/flashcards/:uuid" element={<DoFlashcard />} />
		</Routes>
	);
};

export default AppRoutes;