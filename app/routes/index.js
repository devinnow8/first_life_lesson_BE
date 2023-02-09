var router = require("express").Router();

const stories = require("./story");
const storieReorder = require("./storyReorder");

router.use("/stories", stories);
router.use("/storieReorder", storieReorder);

// Add more routes here if you want!

module.exports = router;
