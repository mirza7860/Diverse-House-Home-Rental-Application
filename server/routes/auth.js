import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../model/User.js";

const router = Router();

//  Configuration Multer for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); //  Store uploaded file in the public/uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //  Use the original file name
  },
});

const upload = multer({ storage: storage });

//  user register

router.post("/register", upload.single("profileimage"), async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const profileimage = req.file;

    if (!profileimage) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const profileimagepath = profileimage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileimagepath,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    console.error("Registration failed:", error.message);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

//  USER LOGIN

router.post("/login", async (req, res) => {
  try {
    //  take the information from the form
    const { email, password } = req.body;

    //  check if user exists

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist." });
    }

    //  compare the password with the uploaded password
    const IsMatch = await bcrypt.compare(password, user.password);
    if (!IsMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // generate new jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
export default router;
