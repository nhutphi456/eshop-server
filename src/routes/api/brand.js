const router = require("express").Router();
const Brand = require("../../models/brand");
const uploadCloud = require("../../utils/storage");

router.get("/list", async (req, res) => {
  try {
    const brands = await Brand.find({}, "-__v");
    res.status(200).json(brands);
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: "Your request could not be processed. Please try again",
    });
  }
});
router.post("/add", uploadCloud.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file;
    const brand = new Brand({
      name,
      description,
    });
    if (file) {
      brand.image = file.path;
    }

    const savedBrand = await brand.save();

    res.status(200).json(savedBrand);
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      error: "Your request could not be processed. Please try again",
    });
  }
});

router.delete("/", async (req, res) => {
    await Brand.deleteMany({})
    res.status(200).json({ok: true})
})

module.exports = router;
