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
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
    try {
      if (req.body.length === 0) {
        res.status(400).send({ message: "No hay turno creado" });
      } else {
        console.log('este es el body', req.body)
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

    } catch (error) {
      console.log (error)
      res.status(404).alert("turno no fue creado", error)  
    }

  })
  );

turnRouter.put(
  '/:id',

  expressAsyncHandler(async (req, res) => {
    //const turnId = req.params.id;
   const turn = await Turn.findById(req.params.id);
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
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;
   try {
    const turn = await Turn.find({orderId: orderId});
    res.json(turn); 

   } catch (error) {
     //console.log('este es el erroget', error)
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

export default turnRouter;
