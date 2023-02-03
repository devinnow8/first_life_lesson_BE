module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: String,
    story: Array,
    storyCoverPage: String,
    storyDes: String,
    isPremium: Boolean,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Stories = mongoose.model("story", schema);
  return Stories;
};
