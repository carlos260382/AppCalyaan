import express from "express";
import expressAsyncHandler from "express-async-handler";
import Turn from "../models/turnModel.js";
// import User from "../models/userModel.js";
// import Service from "../models/serviceModel.js";
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

turnRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
    if (req.body.length === 0) {
      res.status(400).send({ message: "No hay turno creado" });
    } else {
      const { service, day, seller, hour, status, orderId, user, country, postalCode, city, address, fullName  } = req.body;
      const turn = new Turn({
        day: day,
        hour: hour,
        seller: seller,
        status: status,
        orderId: orderId,
        user: user,
        fullName: fullName,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
        service: service,

      });
      const createdTurn = await turn.save();
      res.status(201).send({ message: "New Turn Created", turn: createdTurn });
    }
  })
);

turnRouter.put(
  '/:id',
  
  
  expressAsyncHandler(async (req, res) => {
    const turnId = req.params.id;
    const turn = await Turn.findById(turnId);
    if (turn) {
      turn.status = true;
      const updatedTurn = await turn.save();
      res.send({ message: 'Turno Aceptado', Turn: updatedTurn });
    } else {
      res.status(404).send({ message: 'Turn Not Found' });
    }
  })
);

turnRouter.get(
  '/:id',
  
  
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
   try {
    const turn = await Turn.find({orderId: orderId});
    res.json(turn); 

   } catch (error) {
    res.send(error)

   }}));
    




turnRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const turn = await Turn.findById(req.params.id);
    if (turn) {
      const deleteTurn = await turn.remove();
      res.send({ message: 'Turn Deleted', turn: deleteTurn });
    } else {
      res.status(404).send({ message: 'Turn Not Found' });
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
