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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card w-[22rem] md:w-96 glass shadow-2xl border border-white/10 overflow-hidden group cursor-grab active:cursor-grabbing absolute bg-slate-900/60 backdrop-blur-2xl rounded-3xl"
            style={{ zIndex: 10 - index }}
        >
            <figure className="relative h-[22rem] overflow-hidden">
                <img
                    src={photoUrl}
                    alt="User"
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <h2 className="text-3xl font-bold flex items-end gap-2 leading-none mb-2">
                        {firstName} {lastName}
                        <span className="text-xl font-normal text-slate-300">
                            , {age}
                        </span>
                    </h2>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-medium bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                        <MapPin size={14} className="text-primary" />
                        <span className="capitalize">{gender}</span>
                    </div>
                </div>
            </figure>

            <div className="card-body p-6 pt-4">
                <div className="flex items-center gap-2 text-primary mb-3">
                    <Briefcase size={18} />
                    <span className="font-bold tracking-wide text-sm uppercase">
                        Developer
                    </span>
                </div>

                <p className="text-slate-400 text-sm line-clamp-3 mb-5 leading-relaxed">
                    {about}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {skill &&
                        skill.map((s, i) => (
                            <span
                                key={i}
                                className="badge badge-outline badge-primary text-xs py-3 px-3 font-medium border-primary/30 text-primary/90 bg-primary/5"
                            >
                                {s}
                            </span>
                        ))}
                </div>

                <div className="card-actions justify-between items-center mt-auto px-4 pb-2">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSendConnection("IGNORED")}
                        className="btn btn-circle btn-outline btn-error w-16 h-16 border-2 hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all shadow-lg hover:shadow-rose-500/30"
                    >
                        <X size={32} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSendConnection("INTERESTED")}
                        className="btn btn-circle btn-primary w-16 h-16 border-none text-white bg-gradient-to-tr from-primary to-secondary shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
                    >
                        <Heart size={32} fill="currentColor" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default UserCard;
