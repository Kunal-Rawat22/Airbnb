const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL_FAILED,
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: process.env.CLIENT_URL_FAILED,
    successRedirect: process.env.CLIENT_URL,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_URL_FAILED,
    successRedirect: process.env.CLIENT_URL,
  })
);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/facebook", passport.authenticate("facebook", ["profile"]));

router.get("/github", passport.authenticate("github", ["profile"]));

module.exports = router;
