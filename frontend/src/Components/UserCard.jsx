import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Heart, MapPin, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, index }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about, skill } =
        user;
    const dispatch = useDispatch();

    const handleSendConnection = async (status) => {
        try {
            await axios.post(
                BASE_URL + "/connection/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            handleSendConnection("INTERESTED");
        } else if (info.offset.x < -threshold) {
            handleSendConnection("IGNORED");
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="card w-96 glass shadow-2xl border border-white/10 overflow-hidden group cursor-grab active:cursor-grabbing absolute"
            style={{ zIndex: 10 - index }}
        >
            <figure className="relative h-64 overflow-hidden">
                <img
                    src={photoUrl}
                    alt="User"
                    className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-3xl font-bold flex items-end gap-2">
                        {firstName} {lastName}
                        <span className="text-lg font-normal text-gray-300 mb-1">
                            , {age}
                        </span>
                    </h2>
                    <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
                        <MapPin size={14} />
                        <span>{gender}</span>
                    </div>
                </div>
            </figure>

            <div className="card-body p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase size={16} />
                    <span className="font-semibold">Developer</span>
                </div>

                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {about}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {skill &&
                        skill.map((s, i) => (
                            <span
                                key={i}
                                className="badge badge-outline badge-primary text-xs p-3"
                            >
                                {s}
                            </span>
                        ))}
                </div>

                <div className="card-actions justify-between items-center mt-auto">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSendConnection("IGNORED")}
                        className="btn btn-circle btn-outline btn-error w-14 h-14 border-2"
                    >
                        <X size={28} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSendConnection("INTERESTED")}
                        className="btn btn-circle btn-primary w-14 h-14 shadow-[0_0_20px_rgba(0,242,234,0.5)] border-none text-black"
                    >
                        <Heart size={28} fill="currentColor" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default UserCard;
