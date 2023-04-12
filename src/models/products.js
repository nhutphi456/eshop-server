const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const options = {
  separator: "-",
  lang: "en",
  truncate: 200,
};

mongoose.plugin(slug, options);
const productSchema = new mongoose.Schema({
  // productId: {
  //   type: String,
  //   required: true,
  // },
  sku: { type: String, required: true },
  slug: { type: String, slug: "name" },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    base: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  thumbImage: {
    type: String,
    required: true,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Category",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateUpdated: {
    type: Date,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
