import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Body from "./Components/Body";
import Connections from "./Components/Connections";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Requests from "./Components/Requests";
import Signup from "./Components/Signup";
import appStore from "./utils/appStore";

function AppContent() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Body />}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/connections" element={<Connections />} />
                    <Route path="/requests" element={<Requests />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <AppContent />
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
