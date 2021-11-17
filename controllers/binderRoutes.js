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
    console.log(req.params.id);
    const response = await fetch("/api/binder/get/1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
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
