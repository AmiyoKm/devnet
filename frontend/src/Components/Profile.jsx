import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const user = useSelector((store) => store.user);

    return (
        user && (
            <div className="min-h-screen pt-10 pb-20 px-4">
                <EditProfile user={user} />
            </div>
        )
    );
};

export default Profile;
