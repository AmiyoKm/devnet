import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Lock, Mail, User, Users } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Signup = () => {
    const [firstName, setFirstName] = useState("opu");
    const [lastName, setLastName] = useState("biswas");
    const [email, setEmail] = useState("opu@gmail.com");
    const [password, setPassword] = useState("password123");
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState("male");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/auth/signup",
                { firstName, lastName, email, password, age, gender },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            navigate("/profile");
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
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
                className="card w-full max-w-md glass border-white/10 p-8 relative z-10 my-8"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Join DevNet
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Connect with developers worldwide
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300">
                                    First Name
                                </span>
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-3 text-gray-500"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="input input-bordered w-full pl-10 bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                    placeholder="John"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300">
                                    Last Name
                                </span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered w-full bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

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

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300">
                                    Age
                                </span>
                            </label>
                            <div className="relative">
                                <Calendar
                                    className="absolute left-3 top-3 text-gray-500"
                                    size={18}
                                />
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="input input-bordered w-full pl-10 bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                    placeholder="25"
                                    min="18"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300">
                                    Gender
                                </span>
                            </label>
                            <div className="relative">
                                <Users
                                    className="absolute left-3 top-3 text-gray-500"
                                    size={18}
                                />
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="select select-bordered w-full pl-10 bg-black/20 border-white/10 focus:border-primary focus:outline-none text-white"
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
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
                        onClick={handleSignup}
                        className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary border-none text-white font-bold mt-4 group"
                    >
                        Sign Up
                        <ArrowRight
                            className="group-hover:translate-x-1 transition-transform"
                            size={18}
                        />
                    </motion.button>

                    <div className="text-center mt-4">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{" "}
                            <span
                                className="text-primary cursor-pointer hover:underline font-semibold"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
