import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import webpush from "web-push";
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  random,
  isAuthTurn,
} from "../utils.js";
dotenv.config();
const port = process.env.PORT || 5000;
const turnRouter = express.Router();

turnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
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
      const keyCode = random(100000, 999999);
      if (req.body.length === 0) {
        res.status(400).send({ message: "No hay turno creado" });
      } else {
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
          phoneUser,
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
          phoneUser: phoneUser,
          address: address,
          city: city,
          postalCode: postalCode,
          country: country,
          service: service,
          keyCode: keyCode,
        });
        const createdTurn = await turn.save();

        res
          .status(201)
          .send({ message: "New Turn Created", turn: createdTurn });

        if (createdTurn) {
          const userSeller = await User.find({
            isSeller: true,
          });

          // *Envio notificacion por email

          // for (let i = 0; i < userSeller.length; i++) {
          // console.log("email user", userSeller[i].email);
          // const transporter = nodemailer.createTransport({
          //   host: "smtp.gmail.com",
          //   port: 465,
          //   secure: true,
          //   auth: {
          //     user: "ep3977752@gmail.com",
          //     pass: process.env.KEY_NODEMAILER,
          //   },
          // });

          // const mailOptions = {
          //   from: "Calyaan",
          //   // to: userSeller[i].email,
          //   to: "calyaan.com@gmail.com",
          //   subject: "Han solicitado turno para un servicio",
          //   text: `El señor ${turn.fullName}, con el numero telefonico ${turn.phoneUser} acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour}, el numero de pedido ${turn.orderId} y el codigo de seguridad para ser presentado por el profesional que toma el servicio es ${turn.keyCode}`,
          // };

          // transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log(
          //       "Email enviado a Calyaan informando la creación del turno"
          //     );
          //   }
          // });
          // }

          // *-------Envio Norificacion Push-----------

          console.log("el seller", userSeller[0].subscription);
          const payload = JSON.stringify({
            title: "Servicio solicitado",
            message: `acaban de solicitar el servicio ${turn.service[0].name}, ${turn.service[0].price}`,
          });

          try {
            for (let i = 0; i < userSeller.length; i++) {
              await webpush.setVapidDetails(
                "mailto:andres260382@gmail.com",
                process.env.PUBLIC_API_KEY_WEBPUSH,
                process.env.PRIVATE_API_KEY_WEBPUSH
              );
              await webpush.sendNotification(
                userSeller[i].subscription,
                payload
              );
              // res.status(200).json();
            }
          } catch (error) {
            console.log("No se pudo enviar la notificacion", error);
            res.status(400).send(error).json();
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
  isAuthTurn,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const turn = await Turn.findById(req.params.id);
    if (turn) {
      turn.status = true;
      const updatedTurn = await turn.save();
      res.send({ message: "Turno Aceptado", Turn: updatedTurn });

      // *-------Envio Norificacion Push-----------

      const user = await User.findById(turn.user);
      console.log("el usuario", user);
      const payload = JSON.stringify({
        title: "Servicio Aprobado",
        message: `por el profesional ${req.body.name}, en su correo recibira los detalles para realizar el pago`,
      });

      try {
        await webpush.setVapidDetails(
          "mailto:andres260382@gmail.com",
          process.env.PUBLIC_API_KEY_WEBPUSH,
          process.env.PRIVATE_API_KEY_WEBPUSH
        );
        await webpush.sendNotification(user.subscription, payload);
        // res.status(200).json();
      } catch (error) {
        console.log("No se pudo enviar la notificacion", error);
        res.status(400).send(error).json();
      }

      // ---------------> Envio EMAIL---------------------->

      //       const transporter = nodemailer.createTransport({
      //         host: "smtp.gmail.com",
      //         port: 465,
      //         secure: true,
      //         auth: {
      //           user: "ep3977752@gmail.com",
      //           pass: process.env.KEY_NODEMAILER,
      //         },
      //       });

      //       const mailOptions = {
      //         from: "Remitente",
      //         to: turn.emailUser,
      //         subject: "Turno Aceptado",
      //         text: `¡Señor ${turn.fullName}, le informamos que ha sido aceptado el turno para su servicio, por el profesional ${req.body.name}, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido `,
      //         html: `
      //         <p>¡Señor ${turn.fullName}, le informamos que ha sido aceptado el turno para su servicio, por el profesional ${req.body.name}, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido</p>
      //         <img src=${req.body.img} width: "10" height: "10">

      //         `,
      //       };

      //       await transporter.sendMail(mailOptions, (err, info) => {
      //         if (err) {
      //           console.log(err);
      //         } else {
      //           console.log("Email enviado a cliente confirmando aceptacion Turno");
      //         }
      // });
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
      res.send(error);
    }
  })
);

turnRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log("loq llega", req.params.id);
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
