import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';
import './registration.css'

const Registration = () => {
    const [showPassword, setShowPassword] = useState(null)
    const [showConfirmPassword, setShowConfirmPassword] = useState(null)
    const handleform = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.photoURL.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmpassword.value;
        console.log(name, email, photoURL, password, confirmPassword);
        if (name === '' && email === '' && photoURL === '' && password === '' && confirmPassword === '') {
            alert('place fill up all the filds')
        }
        else if (name === '') {
            alert('enter you name')
        }
        else if (email === '') {
            alert('enter you email')
        }
        else if (photoURL === '') {
            alert('enter you photourl')
        }
        else if (password === '') {
            alert('enter you name')
        }
        else if (confirmPassword === '') {
            alert('enter you name')
        }
        else if (password !== confirmPassword) {
            alert('password is not mach comfirmpassword')
        }
    }
    return (
        <div className='w-full h-[95vh] flex items-center justify-center mt-5'>
            <div className='max-w-[600px]'>
                <form onSubmit={handleform} className="forms w-[400px] max-sm:w-full px-7">
                    <p id="headings" className='my-2.5'>Registration</p>
                    <div className="field mb-2.5">
                        <input placeholder="Email" name='email' className="input-field" type="Email"></input>
                    </div>
                    <div className="field mb-2.5">
                        <input placeholder="Name" name='name' className="input-field" type="text"></input>
                    </div>
                    <div className="field mb-2.5">
                        <input placeholder="Profile Image" name='photoURL' className="input-field" type="text"></input>
                    </div>
                    <div className="field mb-2.5">
                        <input placeholder="Password" name='password' className="input-field" type={showPassword ? 'text' : 'password'}></input>
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                            }
                        </span>
                    </div>
                    <div className="field">
                        <input placeholder="Confirm Password" name='confirmpassword' className="input-field" type={showConfirmPassword ? 'text' : 'password'}></input>
                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />
                            }
                        </span>
                    </div>
                    <Link className="text-xs pl-3 my-2.5 hover:text-red-800 cursor-pointer text-start text-white">Forgot Password</Link>
                    <button className="button1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Registration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                    <p className='text-[14px] mt-2'>Already have an account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
                </form>
            </div>
            
        </div>
    );
};

export default Registration;