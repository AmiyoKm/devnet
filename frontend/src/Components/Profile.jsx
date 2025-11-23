import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const user = useSelector((store) => store.user);

    return (
        user && (
            <div className="min-h-screen bg-background flex justify-center items-center py-10 px-4">
                <EditProfile user={user} />
            </div>
        )
    );
};

export default Profile;
