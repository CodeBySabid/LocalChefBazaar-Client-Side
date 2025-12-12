import React, { useContext, useState } from 'react';
import './login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../providers/AuthContext';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { sinIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const HandlesinInuser = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (!email && !password) {
            toast.error("Please fill in all field!");
            return;
        }
        if (!email) {
            toast.error("Please fill in the email field!");
            return;
        }
        if (!password) {
            toast.error("Please fill in the password field!");
            return;
        }
        sinIn(email, password)
        .then(() => {
            toast.success("Successfull LogIn!")
            navigate(location.state || '/')
        }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    toast.error('Email is incorrect!');
                }
                else if (error.code === "auth/wrong-password") {
                    toast.error("Password is incorrect!");
                }
                else if (error.code === "auth/invalid-email") {
                    toast.error("Email format is invalid!");
                }
                else if (error.code === "auth/invalid-credential") {
                    toast.error("Please check your password and email!");
                }
                else {
                    toast.error(error.message);
                }
            })
    }
    return (
        <div className='w-full h-[95vh] flex items-center justify-center mt-5'>
            <div className='max-w-[600px]'>
                <form onSubmit={HandlesinInuser} className="forms w-[400px] max-sm:w-full px-7">
                    <p id="headings" className='my-2.5'>Login</p>
                    <div className="field mb-2.5">
                        <input autocomplete="off" placeholder="User Email" name='email' className="input-field" type="text"></input>
                    </div>
                    <div className="field">
                        <input placeholder="Password" className="input-field" name='password' type={showPassword ? 'text' : 'password'}></input>
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                            }
                        </span>
                    </div>
                    <Link className="text-xs pl-3 my-2.5 hover:text-red-800 cursor-pointer text-start text-white">Forgot Password</Link>
                        <button className="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                    <p className='text-xs mt-2 mb-4 text-white'>Dont’t Have An Account ?<Link className='text-red-600' to={'/register'}> Registration</Link></p>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;