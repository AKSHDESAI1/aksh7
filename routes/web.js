import express from "express";
import Authentication from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
    console.log(1)
    res.redirect("/profile");
})

router.route("/login")
    .get(Authentication.Login)
    .post(Authentication.postLogin);

router.route("/signup")
    .get(Authentication.Signup)
    .post(Authentication.postSignup)

router.get("/profile", Authentication.Profile);

router.get("/logout1", Authentication.logout1);
export default router;  