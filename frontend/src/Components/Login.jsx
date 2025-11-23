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
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-background">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-2000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="card w-full max-w-md glass border-white/10 p-8 relative z-10 shadow-2xl bg-slate-900/40 backdrop-blur-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">
                        Enter your credentials to access your account
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="form-control">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">
                                Email Address
                            </span>
                        </label>
                        <div className="relative group">
                            <Mail
                                className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-primary transition-colors"
                                size={20}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full pl-12 bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none text-white placeholder:text-slate-600 transition-all h-12 rounded-xl"
                                placeholder="dev@example.com"
                            />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label pb-1">
                            <span className="label-text text-slate-300 font-medium">
                                Password
                            </span>
                        </label>
                        <div className="relative group">
                            <Lock
                                className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-primary transition-colors"
                                size={20}
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full pl-12 bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none text-white placeholder:text-slate-600 transition-all h-12 rounded-xl"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3"
                        >
                            <p className="text-rose-400 text-sm text-center font-medium">
                                {error}
                            </p>
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogin}
                        className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary border-none text-white font-bold text-lg h-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 mt-2 group"
                    >
                        Login
                        <ArrowRight
                            className="group-hover:translate-x-1 transition-transform"
                            size={20}
                        />
                    </motion.button>

                    <div className="text-center mt-6">
                        <p className="text-slate-400 text-sm">
                            New to DevNet?{" "}
                            <span
                                className="text-primary cursor-pointer hover:text-primary/80 hover:underline font-semibold transition-colors"
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
