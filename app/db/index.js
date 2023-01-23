const dbConfig = require("../config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.story = require("../models/story")(mongoose);
db.storyItem = require("../models/storyItem")(mongoose);

module.exports = db;
