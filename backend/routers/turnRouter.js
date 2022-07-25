import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
import nodemailer from "nodemailer";
import venom from "venom-bot";
import dotenv from "dotenv";
import User from "../models/userModel.js";
// import Service from "../models/serviceModel.js";
import { isAdmin, isAuth, isSellerOrAdmin, random } from "../utils.js";
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
          const user = await User.find({
            isSeller: true,
          });

          // const sendMessage = async () => {
          //   await venom
          //     .create({
          //       session: "session-name", //name of session
          //       multidevice: true, // for version not multidevice use false.(default: true)
          //     })
          //     .then((client) => start(client))
          //     .catch((erro) => {
          //       console.log(erro);
          //     });
          //   function start(client) {
          //     client
          //       .sendText(
          //         "573127411293@c.us",
          //         `El señor ${turn.fullName}, acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour} para mas informacion y/o aceptar el servicio, ingrese a calyaan.com`
          //       )
          //       .then((result) => {
          //         console.log("Result: ", result); //return object success
          //       })
          //       .catch((erro) => {
          //         console.error("Error when sending: ", erro); //return object error
          //       });
          //   }
          // };
          // await sendMessage();

          // *Envio notificacion por email

          // for (let i = 0; i < user.length; i++) {
          //   console.log("email user", user[i].email);
          //   const transporter = nodemailer.createTransport({
          //     host: "smtp.gmail.com",
          //     port: 465,
          //     secure: true,
          //     auth: {
          //       user: "ep3977752@gmail.com",
          //       pass: process.env.KEY_NODEMAILER,
          //     },
          //   });

          //   const mailOptions = {
          //     from: "Remitente",
          //     to: user[i].email,
          //     subject: "Han solicitado un turno",
          //     text: `El señor ${turn.fullName}, acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour} para mas informacion y/o aceptar el servicio, ingrese a calyaan.com`,
          //   };

          //   transporter.sendMail(mailOptions, (err, info) => {
          //     if (err) {
          //       console.log(err);
          //     } else {
          //       console.log(
          //         "Email enviado a los profesionales informando la creación del turno"
          //       );
          //     }
          //   });
          // }
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
    console.log("lo q llega params", req.params);
    console.log("lo q llega Body", req.body);
    const turn = await Turn.findById(req.params.id);
    if (turn) {
      turn.status = true;
      const updatedTurn = await turn.save();
      res.send({ message: "Turno Aceptado", Turn: updatedTurn });

      // ---------------> Envio WHATSAPP---------------------->

      // const sendMessage = async () => {
      //   await venom
      //     .create({
      //       session: "session-name", //name of session
      //       multidevice: true, // for version not multidevice use false.(default: true)
      //     })
      //     .then((client) => start(client))
      //     .catch((erro) => {
      //       console.log(erro);
      //     });
      //   function start(client) {
      //     client
      //       .sendText(
      //         `57${turn.phoneUser}@c.us`,
      //         `¡Señor ${turn.fullName}, le informamos que ha sido aceptado el turno para su servicio, por el profesional ${req.body.name}, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido `
      //       )
      //       .then((result) => {
      //         console.log("Result: ", result); //return object success
      //       })
      //       .catch((erro) => {
      //         console.error("Error when sending: ", erro); //return object error
      //       });
      //   }
      // };
      // await sendMessage();

      // ---------------> Envio EMAIL---------------------->

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
      //   from: "Remitente",
      //   to: turn.emailUser,
      //   subject: "Turno Aceptado",
      //   text: `¡Señor ${turn.fullName}, le informamos que ha sido aceptado el turno para su servicio, por el profesional ${req.body.name}, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido `,
      //   html: `
      //   <p>¡Señor ${turn.fullName}, le informamos que ha sido aceptado el turno para su servicio, por el profesional ${req.body.name}, puede ingresar al sitio web www.calyaan.com, para realizar el proceso de pago y finalizar el pedido</p>
      //   <img src=${req.body.img} width: 10 height: 10>

      //   `,
      // };

      // await transporter.sendMail(mailOptions, (err, info) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log("Email enviado a cliente confirmando aceptacion Turno");
      //   }
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
