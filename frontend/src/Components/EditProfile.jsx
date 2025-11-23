import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skill, setSkill] = useState(user.skill || []);
    const [newSkill, setNewSkill] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();

    const handleAddSkill = () => {
        if (newSkill.trim() && !skill.includes(newSkill.trim())) {
            setSkill([...skill, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkill(skill.filter((s) => s !== skillToRemove));
    };

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about, skill },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className="flex justify-center my-10 w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 w-full">
                {/* Edit Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card glass flex-1 border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden"
                >
                    <div className="card-body p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <User size={24} className="text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-200">
                                Edit Profile
                            </h2>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text text-slate-400 font-medium">
                                            First Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="input input-bordered w-full bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text text-slate-400 font-medium">
                                            Last Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="input input-bordered w-full bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text text-slate-400 font-medium">
                                        Photo URL
                                    </span>
                                </label>
                                <div className="relative">
                                    <Camera
                                        className="absolute left-4 top-3.5 text-slate-500"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) =>
                                            setPhotoUrl(e.target.value)
                                        }
                                        className="input input-bordered w-full pl-12 bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text text-slate-400 font-medium">
                                            Age
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input input-bordered w-full bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label pb-1">
                                        <span className="label-text text-slate-400 font-medium">
                                            Gender
                                        </span>
                                    </label>
                                    <select
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="select select-bordered w-full bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    >
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text text-slate-400 font-medium">
                                        About
                                    </span>
                                </label>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="textarea textarea-bordered h-32 bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl resize-none leading-relaxed"
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label pb-1">
                                    <span className="label-text text-slate-400 font-medium">
                                        Skills
                                    </span>
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) =>
                                            setNewSkill(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            handleAddSkill()
                                        }
                                        placeholder="Add a skill (e.g., React, Node.js)"
                                        className="input input-bordered w-full bg-slate-950/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary/50 text-white rounded-xl h-12"
                                    />
                                    <button
                                        onClick={handleAddSkill}
                                        className="btn btn-primary px-6 rounded-xl"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 min-h-[2rem]">
                                    {skill.map((s, i) => (
                                        <span
                                            key={i}
                                            className="badge badge-primary badge-lg gap-2 py-4 pl-4 pr-2 rounded-lg"
                                        >
                                            {s}
                                            <button
                                                onClick={() =>
                                                    handleRemoveSkill(s)
                                                }
                                                className="btn btn-ghost btn-xs btn-circle text-white hover:bg-white/20"
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="card-actions w-full justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={saveProfile}
                                    className="btn btn-primary w-full bg-gradient-to-r from-primary to-secondary border-none text-white px-8 rounded-xl h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Preview Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 flex flex-col items-center"
                >
                    <div className="w-full max-w-sm sticky top-24">
                        <div className="mb-4 flex items-center gap-2 text-slate-400 px-2">
                            <span className="text-sm font-medium uppercase tracking-wider">
                                Live Preview
                            </span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>
                        <UserCard
                            user={{
                                firstName,
                                lastName,
                                photoUrl,
                                age,
                                gender,
                                about,
                                skill,
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Toast Notifications */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="toast toast-bottom toast-center z-50"
                    >
                        <div className="alert alert-success bg-emerald-500/20 border-emerald-500/50 text-emerald-200 backdrop-blur-md shadow-xl">
                            <span>{success}</span>
                        </div>
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="toast toast-bottom toast-center z-50"
                    >
                        <div className="alert alert-error bg-rose-500/20 border-rose-500/50 text-rose-200 backdrop-blur-md shadow-xl">
                            <span>{error}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditProfile;
