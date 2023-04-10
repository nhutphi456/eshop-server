const router = require("express").Router();
const upload = require("../../utils/upload");
const uploadCloud = require("../../utils/storage");

const Product = require("../../models/products");

router.get("/", async (req, res) => {
  const products = await Product.find({}, "-__v -_id");
  return res.status(200).json(products);
});

router.post("/add", uploadCloud.single("thumbImage"), async (req, res) => {
  try {
    const sku = req.body.sku;
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;

    if (!name) {
      return res.status(400).json({ error: "Missing product name" });
    }
    if (!description) {
      return res.status(400).json({ error: "Missing product description" });
    }
    if (!quantity) {
      return res.status(400).json({ error: "Missing product quantity" });
    }
    if (!price) {
      return res.status(400).json({ error: "Missing product price" });
    }

    const foundProduct = await Product.findOne({ sku });
    if (foundProduct) {
      return res.status(400).json({
        error: "The sku has been used",
      });
    }

    const product = new Product({
      sku,
      name,
      description,
      quantity,
      price,
      thumbImage: req.file.path,
    });

    const savedProduct = await product.save();

    if (savedProduct) {
      return res.status(200).json({
        success: true,
        message: "Product has been added successfully",
        product: savedProduct,
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong. Please try again!",
    });
  }
});

router.delete("/", async (req, res) => {
  await Product.deleteMany({});
  res.status(200).json({ ok: true });
});

module.exports = router;
