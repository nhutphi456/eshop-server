const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 200,
};

mongoose.plugin(slug, options);

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, slug: "name" },
  desciption: { type: String },
  image: { type: String, default: "" },
  createdDate: { type: Date, default: Date.now() },
  updatedDate: Date,
});

brandSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

brandSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Brand", brandSchema);
