const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
// initialize exress
const app = express();
// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Not Connected !!! ", err);
  });

// middle ware to parse req data
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// using routs
app.use("/", require("./routes/authroutes"));

const port = 8000;
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
