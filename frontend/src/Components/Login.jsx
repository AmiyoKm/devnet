import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/auth/login",
                { email, password },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            navigate("/");
        } catch (err) {
            setError(err.response?.error || "Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card w-full max-w-md glass border-white/10 p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Enter your credentials to access your account
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-300">
                                Email
                            </span>
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-3 top-3 text-gray-500"
                                size={18}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full pl-10 bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                placeholder="dev@example.com"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-300">
                                Password
                            </span>
                        </label>
                        <div className="relative">
                            <Lock
                                className="absolute left-3 top-3 text-gray-500"
                                size={18}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full pl-10 bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogin}
                        className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary border-none text-white font-bold mt-4 group"
                    >
                        Login
                        <ArrowRight
                            className="group-hover:translate-x-1 transition-transform"
                            size={18}
                        />
                    </motion.button>

                    <div className="text-center mt-4">
                        <p className="text-gray-400 text-sm">
                            New to DevNet?{" "}
                            <span
                                className="text-primary cursor-pointer hover:underline font-semibold"
                                onClick={() => navigate("/signup")}
                            >
                                Create Account
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
