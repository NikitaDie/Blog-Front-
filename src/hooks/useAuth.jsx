import * as React from "react";
import { jwtDecode } from 'jwt-decode'

const authContext = React.createContext();

async function authenticateUser(login, password) {
    const postData = {
        login: login,
        password: password
    };
    const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.text();
}

function useAuth() {
    const [authed, setAuthed] = React.useState(false);
    const [userToken, setUserToken] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkStoredToken = () => {
            const storedToken = localStorage.getItem("userToken");
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setUserToken(storedToken);
                    setAuthed(true);
                } else {
                    localStorage.removeItem("userToken");
                }
            }
            setLoading(false);
        };

        checkStoredToken();
    }, []);

    const login = async (login, password, rememberMe) => {
        try {
            const userToken = await authenticateUser(login, password);
            setUserToken(userToken);
            console.log(rememberMe);
            if (rememberMe)
            {
                localStorage.setItem("userToken", userToken);
                console.log(localStorage.getItem("userToken"));
            }

            setAuthed(true);
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUserToken(null);
        setAuthed(false);
    };

    return {
        authed,
        userToken,
        login,
        logout,
        loading,
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );

}

export default function AuthConsumer() {
    return React.useContext(authContext);
}