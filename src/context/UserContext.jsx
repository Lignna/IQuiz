import React, { createContext, ReactNode, useContext, useState } from "react";

export const UserContext = createContext({
	username: "",
	init: () => {},
	clear: () => {},
});

const UserContextProvider = ({ children }) => {
	const [username, setUsername] = useState("");

	async function init(username) {
		console.log("username: " + username)
		setUsername(username);
	}

	function clear() {
		setUsername("");
	}
	const value = {
		username,
		init,
		clear,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);