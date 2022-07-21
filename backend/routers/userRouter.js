import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
//import data from '../data.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth, random } from "../utils.js";
dotenv.config();

const userRouter = express.Router();

userRouter.get(
  "/top-sellers",
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          phone: user.phone,
          pointsUser: 0,
          logo: user.seller.logo,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const keyNumber = random(100000, 999999);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body.phone,
      pointsUser: 0,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      numberPassword: keyNumber,
      pointsUser: 0,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);
userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isSeller) {
        user.seller.name = req.body.sellerName || user.seller.name;
        user.seller.logo = req.body.sellerLogo || user.seller.logo;
        user.seller.description =
          req.body.sellerDescription || user.seller.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        logo: updatedUser.seller.logo,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        pointsUser,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.post(
  "/forgotPassword",
  expressAsyncHandler(async (req, res) => {
    console.log("llega body fortgotPassword", req.body.email);
    if (req.body.email == "") {
      res.status(400).send({
        message: "email is required",
      });
    }
    try {
      const [user] = await User.find({ email: req.body.email });

      console.log("usuario encontrado", user);

      if (!user) {
        return res.status(403).send({
          message: "email not found",
        });
      }

      console.log("numero password del user", user.numberPassword);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ep3977752@gmail.com",
          pass: process.env.KEY_NODEMAILER,
        },
      });

      //const emailPort = process.env.PORT || "5000";

      //const { email, _id } = user;

      const mailOptions = {
        from: "Remitente",
        to: user.email,
        subject: "Enlace para recuperar su cuenta en Calyaan.com",
        text: `http://localhost:3000/resetPassword/${user._id}/${user.numberPassword}, `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email enviado");
          res.status(200).json("email to recover account has been sent");
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "an error occurred",
      });
    }
  })
);

// userRouter.post(
//   "/resetPassword:id:token",
//   expressAsyncHandler(async (req, res) => {})
// );

userRouter.put("/recoverPassword/:id/:number", async (req, res) => {
  console.log("lo que llega por body", req.body);
  console.log("lo que llega por params", req.params);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(403).send({
      message: "user not found",
    });
  }
  console.log("usuario encontrado", user);

  if (user.numberPassword != req.params.number) {
    return res.status(401).send({
      message: "numberPassword not match",
    });
  }

  user.password = bcrypt.hashSync(req.body.password, 8);
  const updatedUser = await user.save();
  res.send({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    isSeller: user.isSeller,
    token: generateToken(updatedUser),
  });

  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: bcrypt.hashSync(req.body.password, 8),
  // });
  // const createdUser = await user.save();
  // res.send({
  //   _id: createdUser._id,
  //   name: createdUser.name,
  //   email: createdUser.email,
  //   isAdmin: createdUser.isAdmin,
  //   isSeller: user.isSeller,
  //   numberPassword: keyNumber,
  //   token: generateToken(createdUser),
  // });
});

export default userRouter;
