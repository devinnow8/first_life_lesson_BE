const db = require("../db");
const Stories = db.story;
const StoryItem = db.storyItem;

// Create and Save a new Story
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.story) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a story
  const story = new Stories({
    name: req.body.name,
    story: req.body.story,
  });

  // Save story in the database
  story
    .save(story)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the story."
      });
    });
};

// Retrieve all stories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Stories.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stories."
      });
    });
};

// Find a single story with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stories.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Story with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Story with id=" + id });
    });
};

// Update a story by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Stories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Story with id=${id}. Maybe Story was not found!`
        });
      } else res.send({ message: "Story was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Story with id=" + id
      });
    });
};

// Delete a story with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stories.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Story with id=${id}. Maybe Story was not found!`
        });
      } else {
        res.send({
          message: "Story was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Story with id=" + id
      });
    });
};

// Delete all stories from the database.
exports.deleteAll = (req, res) => {
  Stories.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Stories were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stories."
      });
    });
};

