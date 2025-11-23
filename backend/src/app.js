const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRouter = require("./routes/connnection");
const userRouter = require("./routes/user");

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/connection", connectionRouter);
app.use("/user", userRouter);

const server = http.createServer(app);

connectDB()
    .then(() => {
        console.log("Database connection established...");
        server.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is successfully listening on port ${
                    process.env.PORT || 3000
                }...`
            );
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!, err: ", err);
    });
