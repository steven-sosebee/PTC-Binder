const router = require("express").Router();
const withAuth = require("../utils/auth");
const { User, Binder, Card } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    let scripts = [{ src: "/js/binderActions.js" }];
    const binderData = await Binder.findAll({
      where: { user_id: req.session.user_id },
    });
    const binders = binderData.map((binder) => binder.get({ plain: true }));

    res.status(200).render("binders", {
      binders,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      scripts,
    });
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    let scripts = [{ src: "/js/binderActions.js" }];
    const binderData = await Binder.findByPk(req.params.id, {
      include: [
        {
          model: Card,
        },
      ],
    });
    const cards = binderData.dataValues.cards.map((data) =>
      data.get({ plain: true })
    );
    // console.log(binderData);
    res.status(200).render("binder", {
      cards,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
      user_id: req.session.user_id,
      scripts,
    });
    return;
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
