module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    storyName: String,
    pages: Array,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Stories = mongoose.model("storyItem", schema);
  return Stories;
};
