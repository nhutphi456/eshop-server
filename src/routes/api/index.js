const router = require("express").Router();

const productRoutes = require("./products");
const authRoutes = require("./auth");
const brandRoutes = require("./brand");

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/brand", brandRoutes);

module.exports = router;
