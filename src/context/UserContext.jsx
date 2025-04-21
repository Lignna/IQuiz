import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext({
   username: ""
});

const UserContextProvider = ({ children }) => {
   const [username, setUsername] = useState("");

	async function init(
      username
	) {
      setUsername(username)
	}

	const value = {
      username,
      init
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);
