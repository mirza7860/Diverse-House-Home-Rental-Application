import Router from "express";
import multer from "multer";
import List from "../model/List.js";

// Configuration

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Lising
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded .");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = List.create({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    res.status(200).json(newListing);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Fail to create a new list", error: error.message });
  }
});

// Get Lising
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await List.find({ category: qCategory }).populate("creator");
    } else {
      listings = await List.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Fail to fetch lists", error: error.message });
  }
});

// Get Single Listing Details
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await List.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Fail to fetch list-details", error: error.message });
  }
});
export default router;
