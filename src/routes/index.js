import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgetPassword from '../pages/auth/ForgetPassword';
import Home from '../pages/home/Home';
import CreateMCQ from '../pages/quiz/CreateMCQ';
import CreateFlashcard from '../pages/quiz/CreateFlashcard';
import DoMCQ from '../pages/quiz/DoMCQ';
import DoFlashcard from '../pages/quiz/DoFlashcard';
import CreateByAI from '../pages/quiz/CreateByAI';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-mcq" element={<CreateMCQ />} />
        <Route path="/create-flashcard" element={<CreateFlashcard />} />
        <Route path="/mcqs/:quizId" element={<DoMCQ />} />
        <Route path="/flashcards/:quizId" element={<DoFlashcard />} />
        <Route path="/createbyAI" element={<CreateByAI />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;