import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";

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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center items-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                scale: [0.5, 1, 0.5],
                                opacity: [0.3, 0.8, 0.3],
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <ToastContainer />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="container mx-auto p-8 flex flex-col items-center relative z-10"
                >
                    <div className="w-full max-w-xl bg-slate-900/50 backdrop-blur-xl p-10 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-2xl shadow-purple-900/20">
                        <motion.div
                            key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-6 py-2 rounded-full border border-purple-500/20 mb-4">
                                <Sparkles className="h-5 w-5 text-purple-400" />
                                <span className="text-sm font-semibold text-purple-400">
                                    {isLogin ? "Welcome Back" : "Get Started"}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {isLogin ? "Sign In" : "Create Account"}
                            </h1>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={isLogin ? handleLogin : handleRegister}
                            className="space-y-6"
                        >
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative"
                                    >
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="First Name"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative"
                                    >
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Last Name"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="col-span-2 relative"
                                    >
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Phone Number"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                        />
                                    </motion.div>
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative"
                            >
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative"
                            >
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                                />
                            </motion.div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/10 rounded-lg border border-red-500/30 text-red-400 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                            >
                                <Sparkles className="h-5 w-5" />
                                {isLogin ? "Sign In" : "Create Account"}
                            </motion.button>
                        </motion.form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6 text-center"
                        >
                            <button
                                onClick={toggleForm}
                                className="text-gray-400 hover:text-purple-400 text-sm font-medium transition-colors group"
                            >
                                {isLogin ? (
                                    <>
                                        New here? <span className="text-purple-400 group-hover:underline">Create an account</span>
                                    </>
                                ) : (
                                    <>
                                        Already have an account? <span className="text-purple-400 group-hover:underline">Sign in instead</span>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    className="absolute left-20 bottom-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-10"
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <Footer />
        </>
    );
};

export default LoginRegister;