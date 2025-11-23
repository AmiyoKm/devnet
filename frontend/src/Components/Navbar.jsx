import axios from "axios";
import { motion } from "framer-motion";
import { Bell, Code2, LogOut, User, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/auth/logout",
                {},
                { withCredentials: true }
            );
            dispatch(removeUser());
            dispatch(removeFeed());
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-50 px-4 py-3"
        >
            <div className="navbar glass rounded-2xl px-5 flex justify-between max-w-7xl mx-auto">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition group"
                >
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Code2 size={32} />
                    </motion.div>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        DevNet
                    </span>
                </Link>

                {user && (
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <span className="text-sm">Welcome back,</span>
                            <span className="font-bold text-primary">
                                {user.firstName}
                            </span>
                        </div>

                        <div className="dropdown dropdown-end">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User Photo" src={user.photoUrl} />
                                </div>
                            </motion.div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-900/95 backdrop-blur-xl text-gray-300 border border-white/10 rounded-xl shadow-2xl mt-4 w-60 p-2 right-0 z-50"
                            >
                                <li className="mb-1">
                                    <Link
                                        to="/profile"
                                        className="flex gap-3 p-3 hover:bg-white/10 rounded-lg group"
                                    >
                                        <User
                                            size={18}
                                            className="group-hover:text-primary transition-colors"
                                        />
                                        Profile
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        to="/connections"
                                        className="flex gap-3 p-3 hover:bg-white/10 rounded-lg group"
                                    >
                                        <Users
                                            size={18}
                                            className="group-hover:text-secondary transition-colors"
                                        />
                                        Connections
                                        <span className="badge badge-sm badge-secondary ml-auto">
                                            New
                                        </span>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        to="/requests"
                                        className="flex gap-3 p-3 hover:bg-white/10 rounded-lg group"
                                    >
                                        <Bell
                                            size={18}
                                            className="group-hover:text-yellow-400 transition-colors"
                                        />
                                        Requests
                                    </Link>
                                </li>
                                <div className="divider my-1 border-white/10"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex gap-3 p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg w-full"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;
