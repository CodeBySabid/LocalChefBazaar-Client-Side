import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import './registration.css'
import { AuthContext } from '../../../providers/AuthContext';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';

const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(null)
    const [showConfirmPassword, setShowConfirmPassword] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const handleCreateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.photoURL.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmpassword.value;
        console.log(name, email, photoURL, password, confirmPassword);
        if (name === '' && email === '' && photoURL === '' && password === '' && confirmPassword === '') {
            toast.error('place fill up all the filds')
            return;
        }
        else if (name === '') {
            toast.error('enter you name')
            return;
        }
        else if (email === '') {
            toast.error('enter you email')
            return;
        }
        else if (photoURL === '') {
            toast.error('enter you photourl')
            return;
        }
        else if (password === '') {
            toast.error('enter you name')
            return;
        }
        else if (confirmPassword === '') {
            toast.error('enter you name')
            return;
        }
        else if (password !== confirmPassword) {
            toast.error('password is not mach comfirmpassword')
            return;
        }
        createUser(email, password) 
        .then((result) => {
            const user = result.user;
            updateProfile(user, {
                displayName: name,
                photoURL: photoURL,
            })
            .then(() => {
                toast.success("Successfully Register");
                navigate(location.state || '/');
            })
            .catch((error) => {
                toast.error(error.message);
            })
        })
        .catch(error => {
            if(error.code === "auth/email-already-in-use"){
                toast.error("This email is already registered. Please login!");
            }
            else(
                toast.error(error.message)
            )
        })
    }
    return (
        <div className='w-full h-[95vh] flex items-center justify-center mt-5'>
            <div className='max-w-[600px]'>
                <form onSubmit={handleCreateUser} className="forms w-[400px] max-sm:w-full px-7">
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
                    <p className='text-[14px] mt-2 mb-4 text-white'>Already have an account? <Link className='text-red-600' to={'/login'}>Login</Link></p>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Registration;