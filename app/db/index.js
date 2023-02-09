const dbConfig = require("../config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.story = require("../models/story")(mongoose);
db.storyItem = require("../models/storyItem")(mongoose);

mongoose.connect(
  dbConfig.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 45000,
  },
  function (err) {
    if (err) throw err;
  }
);

mongoose.connection.on("error", (e) => {
  console.log("mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

module.exports = db;
