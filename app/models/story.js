module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      story: Array
    }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Stories = mongoose.model("story", schema);
  return Stories;
};
