import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

const { PUBLIC_API_KEY_WEBPUSH, PRIVATE_API_KEY_WEBPUSH } = process.env;
console.log("llave 1", PUBLIC_API_KEY_WEBPUSH);
webpush.setVapidDetails(
  "mailto:andres260382@gmail.com",
  PUBLIC_API_KEY_WEBPUSH,
  PRIVATE_API_KEY_WEBPUSH
);

export default webpush;
