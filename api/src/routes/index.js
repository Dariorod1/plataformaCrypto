const { Router } = require("express");
const router = Router();
const passport = require("passport");
const {} = require("../middlewares/google");
// import all routers;

const userRoutes = require("./userRoutes");
const courseRoutes = require("./courseRoutes");
const authRoutes = require("./authRoutes");
const profeRoutes = require("./profeRoutes");

//Difinimos las routes

router.use("/users", userRoutes);
router.use("/courses", courseRoutes);
router.use(
  "/auth",/*,
  passport.authenticate("auth-google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  }),*/
  authRoutes
);
router.use("/profe", profeRoutes);

module.exports = router;
