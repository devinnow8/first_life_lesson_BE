const db = require("../db");
const Stories = db.story;
const StoryItem = db.storyItem;

// reorder stories
exports.reorderStories = (req, res) => {
  if (!req.body.stories) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  console.log("");

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

exports.reorderPages = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;

  Stories.deleteMany(id, req.body).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Story with id=${id}. Maybe Story was not found!`,
      });
    } else res.send({ message: "Story was updated successfully." });
  });
};
