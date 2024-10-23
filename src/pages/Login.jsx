import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { state } = useLocation();

    const handleLogin = (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(e.target);
        const user = formData.get('login');
        const password = formData.get('password');
        const rememberMe = formData.get('remember-me');

        login(user, password, rememberMe).then(() => {
            navigate(state?.path || "/");
        });
    };


    return (
        <div className="d-flex justify-content-center align-items-center text-center" style={{height: '100vh'}}>
            <form className="form-signin" onSubmit={handleLogin} style={{width: '300px'}}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt=""
                     width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div className="w-100 mb-2">
                    <input type="email" id="inputEmail" name="login" className="form-control form-control-lg mb-2" placeholder="Email address" required
                           autoFocus/>
                    <input type="password" id="inputPassword" name="password" className="form-control form-control-lg" placeholder="Password" required />
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" name="user" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block w-100" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </form>
        </div>
    );
};

export default Login;
