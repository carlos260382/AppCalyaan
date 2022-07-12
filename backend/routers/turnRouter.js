import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
import nodemailer from "nodemailer";
import { Client } from "whatsapp-web.js";
// import qrcode from "qrcode-terminal";
// import fs from "fs";
// import ora from "ora";
// import chalk from "chalk";
import venom from "venom-bot";
import twilio from "twilio";
import dotenv from "dotenv";
import User from "../models/userModel.js";
// import Service from "../models/serviceModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";
dotenv.config();
const client = new Client();
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

        res
          .status(201)
          .send({ message: "New Turn Created", turn: createdTurn });

        if (createdTurn) {
          const user = await User.find({
            isSeller: true,
          });
          console.log("usuarios prof", user);
          const sendMessage = async () => {
            await venom
              .create({
                session: "session-name", //name of session
                multidevice: true, // for version not multidevice use false.(default: true)
              })
              .then((client) => start(client))
              .catch((erro) => {
                console.log(erro);
              });
            function start(client) {
              client
                .sendText(
                  "573127411293@c.us",
                  `El señor ${turn.fullName}, acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour} para mas informacion y/o aceptar el servicio, ingrese a calyaan.com`
                )
                .then((result) => {
                  console.log("Result: ", result); //return object success
                })
                .catch((erro) => {
                  console.error("Error when sending: ", erro); //return object error
                });
            }
          };
          sendMessage();
          // const TWILIO_ID = "AC140520c9f2cb638d5a3981e0ff4b9fda";
          // const TWILIO_SK = "8254659c1b9e769c29d96cdd86570f8c";
          // const client = twilio(TWILIO_ID, TWILIO_SK);

          // client.messages
          //   .create({
          //     from: "whatsapp:+14155238886",
          //     body: `El señor ${turn.fullName}, acaba de solicitar los servicios ${turn.service}, para el dia ${turn.day} y hora ${turn.hour} para mas informacion y/o aceptar el servicio, ingrese a calyaan.com`,
          //     to: "whatsapp:+573127411293",
          //   })
          //   .then((message) => console.log(message.sid));

          // *** Aca comienza la configuracion whatsApp-Web.js

          // const SESSION_FILE_PATH = "./session.json";

          // const withSession = () => {
          //   const spinner = ora(
          //     `Cargando ${chalk.yellow("validando sesion con whatsApp...")}`
          //   );
          //   sessionData = require(SESSION_FILE_PATH);
          //   spinner.start();
          //   const client = new Client({
          //     session: sessionData,
          //   });

          //   client.on("ready", () => {
          //     console.log("client is ready");
          //     // spinner.stop();

          //     // connectionReady();
          //     sendMessage("573127411293", "Hola andres");
          //   });

          //   client.on("auth_failure", () => {
          //     spinner.stop();
          //     console.log(
          //       "error de autenticacion vuelva a generar codigo QR (borre el archivo session.json)"
          //     );
          //   });

          //   client.initialize();
          // };

          // const withOutSession = () => {
          //   console.log("No tenemos session guardada");
          //   const client = new Client();
          //   client.on(
          //     "qr",
          //     (qr) => {
          //       qrcode.generate(qr, { small: true });
          //       console.log(`Ver QR http://localhost:${port}/qr`);
          //       socketEvents.sendQR(qr);
          //     }

          //     // generateImage(qr, () => {
          //     //   qrcode.generate(qr, { small: true });
          //     //   console.log(`Ver QR http://localhost:${port}/qr`);
          //     //   socketEvents.sendQR(qr);
          //     // })
          //   );

          //   client.on("ready", async (a) => {
          //     console.log("client is ready");
          //     // connectionReady();
          //     await client.sendMessage("573128596420", "hola andres");
          //     // // socketEvents.sendStatus(client)
          //   });

          //   client.on("auth_failure", (e) => {
          //     console.log(e);
          //     connectionLost();
          //   });

          //   client.on("authenticated", (session) => {
          //     let sessionData = session;
          //     if (sessionData) {
          //       fs.writeFile(
          //         SESSION_FILE_PATH,
          //         JSON.stringify(session),
          //         function (err) {
          //           if (err) {
          //             console.log(`Ocurrio un error con el archivo: `, err);
          //           }
          //         }
          //       );
          //     }
          //   });
          //   client.initialize();
          // };

          // const sendMessage = async (to, message) => {
          //   await client.sendMessage(to, message);
          // };

          // fs.existsSync(SESSION_FILE_PATH) ? withSession() : withOutSession();

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
