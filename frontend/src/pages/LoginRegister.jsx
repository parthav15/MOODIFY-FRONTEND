import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        if (!isLogin) {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPhone("");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/emotion/user_login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                const userResponse = await fetch(`http://localhost:8000/emotion/user_details/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const userData = await userResponse.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userData.user_details));
                toast.success("Logged in successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => navigate("/", { replace: true }), 2000);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/emotion/user_register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                localStorage.setItem("token", data.token);
                setIsLogin(true);
                toast.success("Registered successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-[#6a0dad] to-[#b19cd9] flex flex-col justify-center items-center">
                <ToastContainer />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="container mx-auto p-8 flex flex-col items-center"
                >
                    <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg p-10 rounded-xl shadow-lg border border-white/20">
                        <motion.h1
                            key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-extrabold text-white text-center mb-6"
                        >
                            {isLogin ? "Login" : "Register"}
                        </motion.h1>
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={isLogin ? handleLogin : handleRegister}
                        >
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="col-span-2"> {/* New field for phone number */}
                                        <label className="block text-white text-sm font-medium mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="mb-4">
                                <label className="block text-white text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm my-2">{error}</p>}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-[#6a0dad] hover:bg-[#5c0d8e] text-white py-2 px-4 rounded-lg font-bold text-lg transition-all"
                            >
                                {isLogin ? "Login" : "Register"}
                            </motion.button>
                        </motion.form>
                        <div className="mt-4 text-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="text-white text-sm font-bold hover:text-blue-400"
                                onClick={toggleForm}
                            >
                                {isLogin ? "Create a new account" : "Already have an account?"}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default LoginRegister;

