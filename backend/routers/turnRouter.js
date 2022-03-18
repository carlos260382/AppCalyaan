import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const turnRouter = express.Router();

turnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log("este es el get turn");

    try {
      let turns = await Turn.find();
      res.json(turns);
    } catch (error) {
      res.send(error);
    }
  })
);

// turnRouter.get('/:id', async (req, res) => {
//     let id = req.params;
//     try {
//         let turn = await Turn.findOne({
//             where: { id: id },
//             include: [
//                 {
//                     model: Center,
//                     attributes: ['id', 'name', 'address'],
//                     through: {
//                         attributes: [],
//                     },
//                 },
//             ],
//         });
//         res.json(turn);
//     } catch (error) {
//         res.send(error);
//     }
// });

turnRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
    if (req.body.length === 0) {
      res.status(400).send({ message: "No hay turno creado" });
    } else {
      const { day, hour } = req.body;
      const turn = new Turn({
        day: day,
        hour: hour,
        seller: req.user._id,
      });
      const createdTurn = await turn.save();
      res.status(201).send({ message: "New Turn Created", turn: createdTurn });
    }
  })
);
//     try {
//         const newTurn = {
//             day,
//             hour,
//         };

//         console.log('req -> ' + day, hour);
//         const turnCreated = await Turn.save(newTurn);

//         const idUser = await User.findOne({ where: { dni } });
//         console.log('findOneUser -> ' + JSON.stringify(idUser));

//         turnCreated.addUser(idUser?.id);

//         // const transporter = nodemailer.createTransport({
//         //     host: 'smtp.gmail.com',
//         //     port: 465,
//         //     secure: true,
//         //     auth: {
//         //         user: 'spotyfoty2@gmail.com',
//         //         pass: 'vjqkenpthvvquuyy',
//         //     },
//         // });

//         // const mailOptions = {
//         //     from: 'Remitente',
//         //     to: email,
//         //     subject: '¡Nuevo Turno!',
//         //     text: `Nuevo turno el dia ${dia} de ${horario} en ${centro}`,
//         // };

//         // await transporter.sendMail(mailOptions, (err, info) => {
//         //     if (err) {
//         //         console.log(err);
//         //     } else {
//         //         console.log('Email enviado');
//         //     }
//         // });

//         return res.json({ message: 'New Turn created!', user: newTurn });
//     } catch (err) {
//         console.log(err);

//         return res.json({
//             message: 'Turn already exists!',
//         });
//     }
// });

// turnRouter.put('/:id', (req, res, next) => {
//     const { id } = req.params;
//     const body = req.body;
//     Turn.update(body, {
//         where: {
//             id,
//         },
//     })
//         .then(() => {
//             res.send('se modificó satisfactoriamente');
//         })
//         .catch((error) => next(error));
// });

export default turnRouter;
