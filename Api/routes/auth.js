const router = require("express").Router();
const passport = require("passport");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL_FAILED,
    successRedirect: process.env.CLIENT_URL,
  })
);


router.get("/google", passport.authenticate("google", ["profile", "email"]));


module.exports = router;
