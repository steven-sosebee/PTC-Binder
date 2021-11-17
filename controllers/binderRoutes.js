const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Binder } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    let scripts = [
      { src: "/js/login.js" },
      { src: "/js/index.js" },
      { src: "/js/binderActions.js" },
    ];
    const response = await fetch("/api/users/binders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 201) {
      res.render("login");
    }
    res.render("binder", {
      response,
      logged_in: req.session.logged_in,
      scripts,
    });
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ["password"] },
    //   include: [{ model: Binder }],
    // });

    // const user = userData.get({ plain: true });
    // console.log("**************************", user);
    // res.render("dashboard", {
    //   ...user,
    //   logged_in: true,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    let scripts = [
      { src: "/js/login.js" },
      { src: "/js/index.js" },
      { src: "/js/binderActions.js" },
    ];
    const response = await fetch(`/api/users/binders/get/${req.params.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    res.render("binder", {
      response,
      logged_in: req.session.logged_in,
      scripts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
