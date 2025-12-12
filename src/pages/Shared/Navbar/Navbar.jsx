import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";
import image from '../../../assets/images.jpg'
import { AuthContext } from "../../../providers/AuthContext";

const Navbar = () => {
    const { user, sinOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const dropdownRef = useRef(null);
    const lastScrollY = useRef(0);
    

    const SinOut = () => {
        sinOut()
    }

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                setHideNav(true);
            } else {
                setHideNav(false);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuLinks = (
        <>
            <NavLink to={'/'}>dasbord</NavLink>
        </>
    )

    return (
        <div className={`navbar fixed top-0 left-0 w-full z-50 px-4 transition-transform duration-300 ${hideNav ? "-translate-y-full" : "translate-y-0"} bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/10 shadow-lg `}>
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-14 h-14 rounded-full" src={image} alt="Logo" />
                    <span className="font-bold text-xl">ChefBazaar</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 text-lg font-medium">
                    {
                        user ? menuLinks : ''
                    }
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost text-2xl max-sm:hidden"
                >
                    {theme === "dark" ? <HiSun /> : <HiMoon />}
                </button>
                <div className="hidden lg:inline-flex">
                    {
                        user ? <>
                            <div className="flex">
                                <div className="relative group">
                                    {user ? (
                                        <div className="relative group">
                                            {user ? (
                                                <Link to={'/'}>
                                                    <img className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer" src={user.photoURL} alt="profile" />
                                                </Link>
                                            ) : ''}
                                        </div>
                                    ) : ''}
                                    {user && (
                                        <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                            {user.displayName}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={SinOut}
                                    className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                >
                                    <span
                                        className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                    ></span>
                                    <span
                                        className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                    >Login Out</span>
                                </button>
                            </div>
                        </> : <>
                            <div className="flex gap-5">
                                <Link
                                    to="/login"
                                    className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                >
                                    <span
                                        className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                    ></span>
                                    <span
                                        className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                    >Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                >
                                    <span
                                        className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                    >
                                        <span
                                            className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                        ></span>
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                    ></span>
                                    <span
                                        className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                    >Register</span>
                                </Link>
                            </div>
                        </>
                    }
                </div>

                <button
                    className="btn btn-ghost text-3xl lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <HiX /> : <HiMenu />}
                </button>
            </div>
            {open && (
                <div ref={dropdownRef} className="absolute  text-center top-full left-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border-b border-white/10 lg:hidden animate-slide-down px-6 py-4">
                    <ul className="menu menu-vertical gap-3 text-lg font-medium">
                        {
                            user ? menuLinks : ''
                        }
                        <button
                            onClick={toggleTheme}
                            className="btn btn-ghost text-2xl max-lg:hidden max-sm:inline-flex"
                        >
                            {theme === "dark" ? <HiSun /> : <HiMoon />}
                        </button>
                        {
                            user ? <>
                                <div className="flex gap-5">
                                    <div className="relative group">
                                        {user ? (
                                            <div className="relative group">
                                                {user ? (
                                                    <Link to={'/'}>
                                                        <img className="rounded-full w-[45px] h-[45px] object-cover cursor-pointer" src={user.photoURL} alt="profile" />
                                                    </Link>
                                                ) : ''}
                                            </div>
                                        ) : ''}
                                        {user && (
                                            <span className="absolute left-1/2 -bottom-10 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                                {user.displayName}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={SinOut}
                                        className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                    >
                                        <span
                                            className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                        ></span>
                                        <span
                                            className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                        >Login Out</span>
                                    </button>
                                </div>
                            </> : <>
                                <div className="flex gap-3">
                                    <Link
                                        to="/login"
                                        className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                    >
                                        <span
                                            className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                        ></span>
                                        <span
                                            className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                        >Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="relative flex items-center px-6 py-2 max-sm:py-1 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                                    >
                                        <span
                                            className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
                                        >
                                            <span
                                                className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                            ></span>
                                        </span>
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                                        ></span>
                                        <span
                                            className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                                        >Register</span>
                                    </Link>
                                </div>
                            </>
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
