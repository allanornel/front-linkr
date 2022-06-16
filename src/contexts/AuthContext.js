import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const LOCAL_STORAGE_KEY = "linkr-token";
const persistedToken = localStorage.getItem(LOCAL_STORAGE_KEY);
const pictureLocal = localStorage.getItem("picture");
export function AuthProvider({ children }) {
	const [token, setToken] = useState(persistedToken);
	const [image, setImage] = useState(pictureLocal);

	function signIn(token, picture) {
		setToken(token);
		setImage(picture);
		localStorage.setItem(LOCAL_STORAGE_KEY, token);
		localStorage.setItem("picture", picture);
	}

	function signOut() {
		setToken(null);
		setImage(null);
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		localStorage.removeItem("picture");
	}

	return (
		<AuthContext.Provider value={{ token, image, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}
