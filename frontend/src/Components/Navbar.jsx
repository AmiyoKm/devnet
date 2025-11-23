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
            className="fixed top-0 left-0 w-full z-50 px-4 py-4"
        >
            <div className="navbar glass rounded-full px-6 flex justify-between max-w-7xl mx-auto border border-white/10 shadow-2xl bg-slate-900/60 backdrop-blur-xl">
                <Link
                    to="/"
                    className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-primary/80 transition group"
                >
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="bg-primary/10 p-2 rounded-full"
                    >
                        <Code2 size={28} className="text-primary" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent font-extrabold tracking-tight">
                        DevNet
                    </span>
                </Link>

                {user && (
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-3 text-slate-300 bg-slate-800/50 px-5 py-2.5 rounded-full border border-white/5">
                            <span className="text-sm font-medium">
                                Welcome back,
                            </span>
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
                                className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-slate-900"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User Photo" src={user.photoUrl} />
                                </div>
                            </motion.div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-slate-900/95 backdrop-blur-xl text-slate-300 border border-white/10 rounded-2xl shadow-2xl mt-4 w-64 p-3 right-0 z-50"
                            >
                                <li className="mb-1">
                                    <Link
                                        to="/profile"
                                        className="flex gap-3 p-3 hover:bg-white/5 rounded-xl group transition-all"
                                    >
                                        <User
                                            size={18}
                                            className="group-hover:text-primary transition-colors"
                                        />
                                        <span className="font-medium">
                                            Profile
                                        </span>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        to="/connections"
                                        className="flex gap-3 p-3 hover:bg-white/5 rounded-xl group transition-all"
                                    >
                                        <Users
                                            size={18}
                                            className="group-hover:text-secondary transition-colors"
                                        />
                                        <span className="font-medium">
                                            Connections
                                        </span>
                                        <span className="badge badge-sm badge-secondary ml-auto">
                                            New
                                        </span>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        to="/requests"
                                        className="flex gap-3 p-3 hover:bg-white/5 rounded-xl group transition-all"
                                    >
                                        <Bell
                                            size={18}
                                            className="group-hover:text-yellow-400 transition-colors"
                                        />
                                        <span className="font-medium">
                                            Requests
                                        </span>
                                    </Link>
                                </li>
                                <div className="divider my-1 border-white/5"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex gap-3 p-3 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl w-full transition-all"
                                    >
                                        <LogOut size={18} />
                                        <span className="font-medium">
                                            Logout
                                        </span>
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
