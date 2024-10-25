import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";

const SignupForm = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const createUser = async (username, email, password) => {
        const postData = {
            username: username,
            login: email,
            password: password,
        };
        try {
            const response = await fetch("/api/v1/users/create", {
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

            toast.success('The user was successfully created!', {
                onClose: () => {
                    navigate('/activation', { state: { fromComponent: true } });
                }
            });

            return await response.text();
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateUsername = (username) => {
        return username.length >= 3;
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (!validateUsername(username)) {
            validationErrors.username = "Username must be at least 3 characters long";
        }

        if (!validateEmail(email)) {
            validationErrors.email = "Invalid email address";
        }

        if (!validatePassword(password)) {
            validationErrors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character";
        }

        if (password !== confirmPassword) {
            validationErrors.password = "Passwords do not match";
        }

        if (Object.keys(validationErrors).length > 0) {
            console.log(Object.keys(validationErrors).length)
            setErrors(validationErrors);
        } else {
            await createUser(username, email, password);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-center" style={{height: '100vh'}}>
            <form className="form-signin" onSubmit={handleSubmit} style={{width: '400px'}}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                     alt=""
                     width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                <div className="w-100 mb-2" onFocus={() => setErrors({})}>
                    <input type="text" id="username" name="username" className="form-control form-control-lg mb-2"
                           placeholder="Username" required
                           autoFocus/>
                    {errors.username && <div className="text-danger">{errors.username}</div>}
                    <input type="email" id="inputEmail" name="email" className="form-control form-control-lg mb-2"
                           placeholder="Email address" required/>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                    <input type="password" id="inputPassword" name="password"
                           className="form-control form-control-lg mb-2"
                           placeholder="Password" required/>
                    <input type="password" id="confirmPassword" name="confirmPassword"
                           className="form-control form-control-lg"
                           placeholder="Confirm Password" required/>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-lg btn-primary btn-block w-100">Sign Up</button>
                <p className="mt-4 mb-3 text-muted">© 2017-2018</p>
            </form>
        </div>
    );
}

export default SignupForm;
