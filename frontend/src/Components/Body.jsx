import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(user.data.data));
        } catch (err) {
            if (err.status == 401 && location.pathname !== "/signup") {
                navigate("/login");
            }
            console.log(err);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, []);
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Body;
