const db = require("../db");
const Stories = db.story;
const StoryItem = db.storyItem;

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.name ||
    !req.body.story ||
    !req.body.storyCoverPage ||
    !req.body.storyDes ||
    !req.body.isPremium
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a story
  const story = new Stories({
    name: req.body.name,
    story: req.body.story,
    storyCoverPage: req.body.storyCoverPage,
    storyDes: req.body.storyDes,
    isPremium: !req.body.isPremium,
    // storyType: req.body.storyType,
  });

  // Save story in the database
  story
    .save(story)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the story.",
      });
    });
};

// reorder stories
exports.reorderStories = (req, res) => {
  console.log("indadsasdsa");
  Stories.updateMany([
    {
      name: "test 223232 -updated",
      story: [
        {
          id: "a5c9",
          text: "test 2",
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/fir-upload-5d39a.appspot.com/o/files%2Fa5c9?alt=media&token=b2e41d55-2471-4c27-aa6e-5cbaa338cdd6",
          isAddMode: true,
          isEditMode: false,
        },
      ],
      storyCoverPage:
        "https://firebasestorage.googleapis.com/v0/b/fir-upload-5d39a.appspot.com/o/files%2F6e90?alt=media&token=30440760-ef12-4dbf-9c6b-7f83c9593abd",
      storyDes: "test 2",
      id: "63db7ae18b524d1de10082ec",
    },
  ])
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
};

// Retrieve all stories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Stories.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stories.",
      });
    });
};

// Find a single story with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stories.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Story with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Story with id=" + id });
    });
};

// Update a story by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Stories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Story with id=${id}. Maybe Story was not found!`,
        });
      } else res.send({ message: "Story was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Story with id=" + id,
      });
    });
};

// Delete a story with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stories.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Story with id=${id}. Maybe Story was not found!`,
        });
      } else {
        res.send({
          message: "Story was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Story with id=" + id,
      });
    });
};

// Delete all stories from the database.
exports.deleteAll = (req, res) => {
  Stories.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Stories were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stories.",
      });
    });
};
