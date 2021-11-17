const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Binder } = require("../models");

router.get("/login", async (req, res) => {
  try {
    res.status(200).render("dashboard", {
      logged_in: true,
      user_id: req.session.user_id,
      user_name: req.session.user_name,
    });
    return;
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/binders", withAuth, async (req, res) => {
  try {
    const binderData = await Binder.findAll({
      where: { user_id: req.session.user_id },
    });
    if (binderData.length > 1) {
      let scripts = [
        { src: "/js/logout.js" },
        { src: "/js/index.js" },
        { src: "/js/binderActions.js" },
      ];
      console.log(binderData);
      console.log("Retrieving plain data...");
      const binders = binderData.map((binder) => binder.get({ plain: true }));
      res.render("userPage", {
        binders,
        scripts,
        logged_in: req.session.logged_in,
      });
    } else {
      let scripts = [
        { src: "/js/logout.js" },
        { src: "/js/index.js" },
        { src: "/js/binderActions.js" },
      ];
      res.render("userPage", {
        logged_in: req.session.logged_in,
        scripts,
      });
    }

    // res.status(200).json(binderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
