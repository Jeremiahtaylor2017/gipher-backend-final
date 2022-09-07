// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
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
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/images");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	try {
		return res.status(200).json("File uploaded successfully");
	} catch (error) {
		console.log(error);
	}
});

app.listen(PORT, () => {
	console.log(`Litening on port: ${PORT}`);
});
