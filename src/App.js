import React from 'react';
import AppRoutes from './routes';
import SignIn from './pages/auth/SignIn';
import UserContextProvider, { UserContext } from './context/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </UserContextProvider>
  );
};

export default App;