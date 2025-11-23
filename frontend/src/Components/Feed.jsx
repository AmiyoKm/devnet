import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/user/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res.data.data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center h-[80vh] text-center px-4"
            >
                <div className="glass p-10 rounded-3xl max-w-md border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-slate-200 mb-3">
                        No new users found!
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Check back later for more connections.
                    </p>
                </div>
            </motion.div>
        );

    return (
        <div className="flex justify-center items-center min-h-[85vh] relative overflow-hidden py-10">
            <AnimatePresence>
                {feed.map((user, index) => (
                    <UserCard key={user._id} user={user} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Feed;
