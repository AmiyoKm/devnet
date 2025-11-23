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
                className="flex justify-center items-center h-[60vh] text-center"
            >
                <div className="glass p-8 rounded-2xl max-w-md">
                    <h1 className="text-2xl font-bold text-gray-300 mb-2">
                        No new users found!
                    </h1>
                    <p className="text-gray-500">
                        Check back later for more connections.
                    </p>
                </div>
            </motion.div>
        );

    return (
        <div className="flex justify-center items-center min-h-[80vh] relative overflow-hidden">
            <AnimatePresence>
                {feed.map((user, index) => (
                    <UserCard key={user._id} user={user} index={index} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Feed;
