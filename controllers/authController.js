import User from "../models/user.js";
import bcrypt from "bcryptjs";

class Authentication {
    static Login = (req, res) => {
        res.render("login", { "error": null, "emailError": null });
    }

    static postLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                // return res.json({ "error": "This Email-Id is not exits. please try with another one. " });
                return res.render("login", { "emailError": "This Email-Id is not exits. please try with another one.", "error": null })
            }

            const compare = bcrypt.compareSync(password, user.password);
            if (!compare) {
                // return res.json({ "error": "Password is not match." })
                return res.render("login", { "error": "Password is not match.", "emailError": null })
            }
            req.session.name = user.name;
            res.redirect("/profile");
        } catch (error) {
            res.json({ "error": error.message })
        }
    }

    static Signup = (req, res) => {
        res.render("signup");
    }

    static postSignup = async (req, res) => {
        const { name, email, password } = req.body

        try {
            const a = await User.findOne({ email: email });
            if (a) {
                return res.json({ "error": "request with this email id already exists. please try with another one." })
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            const data = new User({
                name, email, password: hash
            });
            const data1 = await data.save();
            res.redirect("login");
        } catch (error) {
            res.send(error);
        }
    }

    static Profile = (req, res) => {
        if (!req.session.name) {
            return res.redirect("login")
        }
        console.log(req.session.name);
        res.render("profile", { "name": req.session.name });
    }

    static logout1 = (req, res) => {
        req.session.destroy()
        res.redirect("login");
    };
}

export default Authentication;