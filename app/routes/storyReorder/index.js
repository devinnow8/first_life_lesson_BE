const db = require("../../db");
const Stories = db.story;
const express = require("express");
const storyReorderController = express.Router();

// reorder stories
const reorderStories = (req, res) => {
  if (!req.body.stories) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  Stories.deleteMany({})
    .then(() => {
      Stories.insertMany(req.body.stories)
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Stories Maybe Stories were not found!`,
            });
          } else res.send({ message: "Story was updated successfully." });
        })
        .catch((err) => {
          console.log("err====>", err);
          res.status(500).send({
            message: "Error updating Stories",
          });
        });
    })
    .catch((err) => {
      console.log("err====>", err);
      res.status(500).send({
        message: "Error updating Stories",
      });
    });
};

storyReorderController.put("/", reorderStories);

module.exports = storyReorderController;