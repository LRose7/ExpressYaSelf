import { useRef } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='registerContainer'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">ExpressYaSelf</h3>
                    <span className="registerDesc">A safe place to express yourself with friends and the world around you.</span> 
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleRegister}>
                        <input type="text" placeholder="Username" className="registerInput" ref={username}  required />    
                        <input type="email" placeholder="Email" className="registerInput" ref={email} required />
                        <input type="password" placeholder="Password" className="registerInput" ref={password} minLength="6" required />
                        <input type="password" placeholder="Confim Password" className="registerInput" ref={confirmPassword} required />
                        <button className="registerBtn"  type="submit">Sign Up</button>
                        <span className="registeredAlready">Already Have an Account?</span>
                        <button className="registerLoginBtn">Login</button>
                    </form>
                </div>

            </div>
        </div>
    )
}
