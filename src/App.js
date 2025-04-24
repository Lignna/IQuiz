import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import SignIn from './pages/auth/SignIn';
import UserContextProvider, { UserContext } from './context/UserContext';

const App = () => {
	return (
		<UserContextProvider>
		<div className="App">
			<Router>
				<AppRoutes />
			</Router>
		</div>
	</UserContextProvider>
	);
};

export default App;