const express = require("express");
const passport = require("passport");

const router = express.Router();

// const authRoute = require("../controllers/authController");
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "github/callback",
  passport.authenticate("github", { failureRedirect: process.env.CLIENT_URI + "/login" }),
  function (req, res) {
    res.redirect(process.env.CLIENT_URI);
  }
);

router.get("/logout", (req, res) => {
    res.session.destroy((err) => {
        res.json({ message: "logged out successfully" });
    });
});

router.get("/check", (req, res) => {
	if (req.isAuthenticated()) {
		res.send({ user: req.user });
	} else {
		res.send({ user: null });
	}
});

module.exports = router;
