const router = require("express").Router();
const passport = require("passport");

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);
router.get("/login/succes", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successful",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
