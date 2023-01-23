module.exports = app => {
  const controller = require("../controllers");

  var router = require("express").Router();

  // Create a new story
  router.post("/create", controller.create);

  // Retrieve all stories
  router.get("/", controller.findAll);

  // Retrieve a single story with id
  router.get("/:id", controller.findOne);

  // Update a story with id
  router.put("/:id", controller.update);

  // Delete a story with id
  router.delete("/:id", controller.delete);

  // Create a new story
  router.delete("/", controller.deleteAll);

  app.use("/api/controllers", router);
};
