import React, { useState } from 'react';
import './login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className='w-full h-[95vh] flex items-center justify-center mt-5'>
            <div className='max-w-[600px]'>
                <form className="forms w-[400px] max-sm:w-full px-7">
                    <p id="headings" className='my-2.5'>Login</p>
                    <div className="field mb-2.5">
                        <input autocomplete="off" placeholder="Username" className="input-field" type="text"></input>
                    </div>
                    <div className="field">
                        <input placeholder="Password" className="input-field" type={showPassword ? 'text' : 'password'}></input>
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
        </div>
    );
};

export default Login;