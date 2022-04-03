import dotenv from "dotenv";
import webpush from 'web-push';
dotenv.config();
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webpush.setVapidDetails(
  "carlos:andres260382@gmail.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

export default webpush;