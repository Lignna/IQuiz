import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import ForgetPassword from '../pages/auth/ForgetPassword';
import Home from '../pages/home/Home';
import CreateMCQ from '../pages/Quiz/CreateMCQ';
import CreateFlashcard from '../pages/Quiz/CreateFlashcard';
import DoMCQ from '../pages/Quiz/DoMCQ';
import DoFlashcard from '../pages/Quiz/DoFlashcard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-mcq" element={<CreateMCQ />} />
        <Route path="/create-flashcard" element={<CreateFlashcard />} />
        <Route path="/mcqs/:quizId" element={<DoMCQ />} />
        <Route path="/flashcards/:quizId" element={<DoFlashcard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;