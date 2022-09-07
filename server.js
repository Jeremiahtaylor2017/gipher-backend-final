// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./controllers/users.controller");
const authRouter = require("./controllers/auth.controller");
const postRouter = require("./controllers/post.controller");

// app setup
const { PORT, MONGO_URI } = process.env;
const app = express();

// db connect
mongoose.connect(MONGO_URI);
mongoose.connection
	.on("open", () => console.log("Connected to MongoDB"))
	.on("close", () => console.log("Disconnected from MongoDB"))
	.on("error", () => console.log(err.message));

// middlware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
	console.log(`Litening on port: ${PORT}`);
});
