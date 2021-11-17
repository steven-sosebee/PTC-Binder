const router = require("express").Router();
const session = require("express-session");
const { User, Binder, BinderCard, Card } = require("../../models");

// display all cards in binder

router.get("/get/:binderid", async (req, res) => {
  try {
    const binderData = await Binder.findByPk(req.params.binderid, {
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
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;

// const binder = binderData.get({ plain: true });
