import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Info, MapPin, Save, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skill, setSkill] = useState(user.skill || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about, skill },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.data));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data || "Something went wrong");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="card glass border border-white/10 overflow-hidden">
                {/* Header Banner */}
                <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                </div>

                <div className="card-body px-8 -mt-20">
                    {/* Profile Photo Section */}
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-gray-900 shadow-2xl">
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-gray-900 p-2 rounded-lg border border-white/10">
                                <User className="text-primary" size={20} />
                            </div>
                        </div>

                        <div className="flex-1 pt-20 md:pt-0 md:mt-20">
                            <h2 className="text-3xl font-bold text-white">
                                {firstName} {lastName}
                            </h2>
                            <p className="text-gray-400 flex items-center gap-2 mt-1">
                                <Briefcase size={16} />
                                Full Stack Developer
                            </p>
                        </div>
                    </div>

                    <div className="divider border-white/10"></div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <User size={16} /> First Name
                                </span>
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <User size={16} /> Last Name
                                </span>
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <Calendar size={16} /> Age
                                </span>
                            </label>
                            <input
                                type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <MapPin size={16} /> Gender
                                </span>
                            </label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <Info size={16} /> About
                                </span>
                            </label>
                            <textarea
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="textarea textarea-bordered h-32 bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-300 flex items-center gap-2">
                                    <MapPin size={16} /> Skill
                                </span>
                            </label>
                            <input
                                type="text"
                                value={skill.join(", ")}
                                onChange={(e) =>
                                    setSkill(e.target.value.split(", "))
                                }
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text text-gray-300">
                                    Photo URL
                                </span>
                            </label>
                            <input
                                type="text"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="input input-bordered bg-black/20 border-white/10 focus:border-primary text-white"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-center mt-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-400 text-center mt-4">
                            Profile updated successfully!
                        </p>
                    )}

                    <div className="card-actions justify-end mt-8">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-primary px-8 gap-2"
                            onClick={saveProfile}
                        >
                            <Save size={18} />
                            Save Changes
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EditProfile;
