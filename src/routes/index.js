import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '../features/Auth/SignIn';
import SignUp from '../features/Auth/SignUp';
import ForgetPassword from '../features/Auth/ForgetPassword';
import Home from '../features/Home/Home';
import CreateMCQ from '../features/Quiz/CreateMCQ';
import CreateFlashcard from '../features/Quiz/CreateFlashcard';
import DoMCQ from '../features/Quiz/DoMCQ';
import DoFlashcard from '../features/Quiz/DoFlashcard';

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
        <Route path="/do-mcq/:quizId" element={<DoMCQ />} />
        <Route path="/do-flashcard/:quizId" element={<DoFlashcard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;