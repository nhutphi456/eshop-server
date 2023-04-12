const router = require("express").Router();
const uploadCloud = require("../../utils/storage");
const auth = require("../../middlewares/auth");
const Product = require("../../models/products");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}, "-__v").populate({ path: "brand", select: "-__v"});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again",
    });
  }
});

router.get("/item/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again",
    });
  }
});

router.post(
  "/add",
  auth,
  uploadCloud.single("thumbImage"),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const brand = req.body.brand;
      const file = req.file;

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
      if (!file) {
        return res.status(400).json({ error: "Missing product image" });
      }

      const foundProduct = await Product.findOne({
        $or: [{ sku }, { name }],
      });
      if (foundProduct) {
        return res.status(400).json({
          error: "Sku or product name has been used",
        });
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        brand,
        thumbImage: file.path,
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
  }
);

router.put("/:id", auth, uploadCloud.none(), async (req, res) => {
  try {
    const productId = req.params.id;
    const sku = req.body.sku;
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const thumbImage = req.body.thumbImage;

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        sku,
        name,
        description,
        quantity,
        price,
        thumbImage,
      },
      { new: true }
    );
    if (!product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Update product successfully",
      product: product,
    });
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
