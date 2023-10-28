import express from "express";
import user from "../models/mymodels.js";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { Name, email, password } = req.body;
  // console.log(req.body);
  if (!req.body.Name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const findUser = await user.findOne({ email: email });
  if (findUser) {
    return res.status(400).json({ message: "User already exist" });
  }

  const newuser = {
    Name: req.body.Name,
    email: req.body.email,
    password: req.body.password,
  };

  const myuser = await user.create(newuser);
  if (myuser) {
    return res.status(200).json({ msg: "User created successfully" });
  }
  return res.status(404).json({ msg: "User not created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  const findUser = await user.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({ msg: "User Not found" });
  }

  if (findUser.password !== password) {
    return res.status(404).json({ msg: "Invalid Credentials" });
  }

  return res
    .status(200)
    .json({ msg: "Login Successful", email: email, text: findUser.text });
});

router.post("/addTask", async (req, res) => {
  const { email, text } = await req.body;
  // console.log(req.body);
  if (!email) {
    return res.status(400).json({ message: "Please login first" });
  }
  const findUser = await user.findOne({ email: email });
  // console.log(findUser)
  if (!findUser) {
    return res.status(404).json({ msg: "User Not found with current email" });
  }
  await user.updateOne({ $push: { text: text } });
  console.log(findUser.text);
  return res
    .status(200)
    .json({ msg: "Task added successfully", text: findUser.text });
});

router.get("/getTasks", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ message: "Please login first" });
  }

  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ email: email, text: findUser.text });
});

router.put("/update", async (req, res) => {
  const { email, updateIdx } = req.body;
  console.log(req.body);
//   console.log(updateIdx);

  if (!email || !updateIdx) {
    return res.status(400).json({ message: "Please login first" });
  }

  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (findUser.text.length > updateIdx && updateIdx >= 0) {
    const itemToDelete = findUser.text[updateIdx]; // Get the item to delete
    console.log(findUser.createdAt)
    await user.updateOne(
      { email: email },
      { $pull: { text: itemToDelete } }
    );

    return res.status(200).json({
      message: "Item removed successfully",
      deleted: itemToDelete,
    });
  } else {
    return res.status(404).json({ message: "Item not found at the specified index" });
  }
});

export default router;
