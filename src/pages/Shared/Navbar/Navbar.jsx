import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const dropdownRef = useRef(null);
    const lastScrollY = useRef(0);
    const location = useLocation();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
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

    const menuLinks = [
        { name: "Features", path: "/features" },
        { name: "Customers", path: "/customers" },
        { name: "Integrations", path: "/integrations" },
    ];

    return (
        <div className={`navbar fixed top-0 left-0 w-full z-50 px-4 transition-transform duration-300 ${hideNav ? "-translate-y-full" : "translate-y-0"} bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/10 shadow-lg `}>
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2">
                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="font-bold text-xl">ACME</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4 text-lg font-medium">
                    {menuLinks.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={
                                    location.pathname === item.path ? "text-primary font-bold underline underline-offset-4" : ""
                                }
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <button
                    onClick={toggleTheme}
                    className="btn btn-ghost text-2xl"
                >
                    {theme === "dark" ? <HiSun /> : <HiMoon />}
                </button>

                <Link to="/signup" className="btn btn-primary btn-sm hidden lg:inline-flex">
                    Sign Up
                </Link>

                <button
                    className="btn btn-ghost text-3xl lg:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <HiX /> : <HiMenu />}
                </button>
            </div>
            {open && (
                <div ref={dropdownRef} className="absolute top-full left-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border-b border-white/10 lg:hidden animate-slide-down px-6 py-4">
                    <ul className="menu menu-vertical gap-3 text-lg font-medium">
                        {menuLinks.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={location.pathname === item.path ? "text-primary font-bold underline underline-offset-4" : "" }
                                    onClick={() => setOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
                        <li>
                            <Link
                                to="/signup"
                                onClick={() => setOpen(false)}
                                className="btn btn-primary mt-2 w-full"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
