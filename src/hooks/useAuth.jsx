import * as React from "react";
import { jwtDecode } from 'jwt-decode'
import {Bounce, toast, ToastContainer} from "react-toastify";

const authContext = React.createContext();

async function authenticateUser(login, password) {
    const postData = {
        username: login,
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

    React.useEffect(() => {
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

    }, []);

    const login = async (login, password, rememberMe) => {
        try {
            const userToken = await authenticateUser(login, password);
            setUserToken(userToken);
            setUserToken(userToken);
            if (rememberMe)
                localStorage.setItem("userToken", userToken);
            setAuthed(true);
        } catch (err) {
            toast.error(err.message);
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
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </authContext.Provider>
    );

}

export default function AuthConsumer() {
    return React.useContext(authContext);
}