import express from 'express';
import webpush from 'web-push';
import expressAsyncHandler from 'express-async-handler';
import { saveSubscription, getSubscriptions, removeSubscription } from '../db.js';
import {
    isAdmin,
    isAuth,
    isSellerOrAdmin,
    mailgun,
    payOrderEmailTemplate,
  } from '../utils.js';

//webpush.setVapidDetails(process.env.MAILTO, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

// export const setRouting = app => {
//     for (const route of pushRoutes) {
//       app[route.method](route.url, route.handler);
//     }
//   };

const pushRoutes = express.Router();

pushRoutes.post (
'/register',
isAuth,
expressAsyncHandler(async (req, res) => {
    const subscription = req.body;
    const saved = await saveSubscription(subscription);
    if (saved) res.status(200).json({ msg: 'Subscription saved!' });
    else res.status(500).json({ err: 'Could not save subscription!' });
}))

pushRoutes.post (
    '/send',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const { title, url, body } = req.body;
        const subscriptions = await getSubscriptions();
        const data = JSON.stringify({
          title,
          payload: { title, body, url, icon: process.env.NOTIFICATION_ICON },
          body: true
        });
        const sentSubscriptions = subscriptions.map(subscription =>
          webpush
            .sendNotification(subscription, data)
            .then()
            .catch(err => {
              if (err.statusCode === 410) removeSubscription(subscription);
            }));
  
        await Promise.all(sentSubscriptions).then(() => {
          res.status(200).json({ msg: 'Notifications sent!' });
        });
    }))

export default pushRoutes;
