import './login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apicalls';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value }, 
            dispatch
        );
    };
  
    return (
        <div className='loginContainer'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">ExpressYaSelf</h3>
                    <span className="loginDesc">A safe place to express yourself with friends and the world around you.</span> 
                </div>
                <div className="loginRight" >
                    <form className="loginBox" onSubmit={handleLogin}>
                        <input 
                        type="email" 
                        placeholder="Email" 
                        className="loginInput" 
                        ref={email} 
                        required
                        />
                        <input 
                        type="password" 
                        placeholder="Password" 
                        className="loginInput" 
                        ref={password} 
                        minLength="6"
                        required
                        />
                        <button className="loginBtn" type="submit" disabled={isFetching}>"Login" </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterBtn"> "Create A New Account" </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
