import express from 'express';
import webpush from '../webpush.js';
import expressAsyncHandler from 'express-async-handler';
//import { saveSubscription, getSubscriptions, removeSubscription } from '../db.js';
import {
    isAuth,
    isSellerOrAdmin,
    } from '../utils.js';

  const pushRouter = express.Router();
    
  let pushSubscripton;
  
  pushRouter.post("/subscription", 
  
  expressAsyncHandler (async (req, res) => {
    pushSubscripton = req.body;
    console.log(pushSubscripton);
  
    // Server's Response
    res.status(201).json();
  }));
  
  pushRouter.post("/new-message", 
  
  expressAsyncHandler (async (req, res) => {
    const { message } = req.body;
    // Payload Notification
    const payload = JSON.stringify({
      title: "My Custom Notification",
      message :"hello world",
    });
    res.status(200).json();
    try {
      await webpush.sendNotification(pushSubscripton, payload);
    } catch (error) {
      console.log(error);
    }
  }));
  
export default pushRouter;
