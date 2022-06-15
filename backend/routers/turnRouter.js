import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";
// import Service from "../models/serviceModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
dotenv.config();

const turnRouter = express.Router();

turnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    //console.log("este es el get turn");

    try {
      let turns = await Turn.find();
      res.json(turns);
    } catch (error) {
      res.send(error);
    }
  })
);

turnRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      if (req.body.length === 0) {
        res.status(400).send({ message: "No hay turno creado" });
      } else {
        console.log("este es el body Turno", req.body);
        const {
          service,
          day,
          seller,
          hour,
          status,
          orderId,
          user,
          country,
          postalCode,
          city,
          address,
          fullName,
          emailUser,
        } = req.body;
        const turn = new Turn({
          day: day,
          hour: hour,
          seller: seller,
          status: status,
          orderId: orderId,
          user: user,
          fullName: fullName,
          emailUser: emailUser,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
          service: service,
        });
        const createdTurn = await turn.save();
        console.log("createdTurn", createdTurn);
        res
          .status(201)
          .send({ message: "New Turn Created", turn: createdTurn });

        if (createdTurn) {
          const user = await User.find({
            isSeller: true,
          });

          // const userEmail = user.map((e) => {
          //   return {
          //     email: e.email,
          //   };
          // });

          // console.log("user admin y seller", userEmail);

          for (let i = 0; i < user.length; i++) {
            console.log("email user", user[i].email);
            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: "ep3977752@gmail.com",
                pass: process.env.KEY_NODEMAILER,
              },
            });

            const mailOptions = {
              from: "Remitente",
              to: user[i].email,
              subject: "Han solicitado un turno",
              text: `El señor ${turn.fullName}, acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour} para mas informacion y/o aceptar el servicio, ingrese a calyaan.com`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  "Email enviado a los profesionales informando la creación del turno"
                );
              }
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(404).alert("turno no fue creado", error);
    }
  })
);

turnRouter.put(
  "/:id",

  expressAsyncHandler(async (req, res) => {
    //const turnId = req.params.id;
    const turn = await Turn.findById(req.params.id);
    if (turn) {
      turn.status = true;
      const updatedTurn = await turn.save();
      res.send({ message: "Turno Aceptado", Turn: updatedTurn });

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ep3977752@gmail.com",
          pass: process.env.KEY_NODEMAILER,
        },
      });

      const mailOptions = {
        from: "Remitente",
        to: turn.emailUser,
        subject: "Turno Aceptado",
        text: `¡Señor ${turn.fullName}, le informamos que ha sido aprobado su turno, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido `,
      };

      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email enviado a cliente confirmando aceptacion Turno");
        }
      });
    } else {
      res.status(404).send({ message: "Turn Not Found" });
    }
  })
);

turnRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
    try {
      const turn = await Turn.find({ orderId: orderId });
      res.json(turn);
    } catch (error) {
      //console.log('este es el erroget', error)
      res.send(error);
    }
  })
);

turnRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const turn = await Turn.findById(req.params.id);
    if (turn) {
      const deleteTurn = await turn.remove();
      res.send({ message: "Turn Deleted", turn: deleteTurn });
    } else {
      res.status(404).send({ message: "Turn Not Found" });
    }
  })
);

export default turnRouter;
