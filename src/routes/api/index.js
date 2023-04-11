const router = require("express").Router();

const productRoutes = require("./products");
const authRoutes = require("./auth");

router.use("/products", productRoutes);
router.use("/auth", authRoutes);

module.exports = router;
