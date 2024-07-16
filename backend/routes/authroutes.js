const exress = require("express");
const routes = exress.Router();
const cores = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
} = require("../controller/authController");

// middleware
routes.use(
  cores({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

routes.get("/", test);
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/profile", getProfile);

module.exports = routes;
