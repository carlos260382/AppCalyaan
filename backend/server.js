import http from "http";
import { Server } from "socket.io";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import serviceRouter from "./routers/serviceRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import cors from "cors";
import turnRouter from "./routers/turnRouter.js";
import mercadopago from "mercadopago";
import { response } from "express";
import webPush from 'web-push'
//import { setRouting } from "./routers/pushRouter.js";
import pushRouter from "./routers/pushRouter.js";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setRouting(app);

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost/calyaan", {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("esta conectado base datos");
  })
  .catch((error) => {
    console.log("este es el error", error);
  });

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/services", serviceRouter);
app.use("/api/orders", orderRouter);
app.use("/api/turn", turnRouter);
app.use("/pushRouter", pushRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});

let email;
app.post("/process-payment", (req, res) => {
  mercadopago.configurations.setAccessToken('TEST-963807750333991-031716-1dd2ac29f3cc0f1a2a97f9a341d3fe80-226754364');
  console.log('este es lo q llega del body', req.body) 
  const orderId= req.body.orderId
   
  const payment_data = {
    transaction_amount: Number(req.body.transaction_amount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.payment_method_id,
    issuer_id: req.body.issuer_id,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.identification.type,
        number: req.body.payer.identification.number,
      },
    },
    email : payer.email
  };
    
  mercadopago.payment
    .save(payment_data)
    .then((response) => {
      return res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      });   

})
console.log ('este es el orderId', orderId,)
console.log('este es el payment', payment_data)
console.log('respuesta de mercado pago', response.body.status)
})




const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("disconnect", () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log("Offline", user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("updateUser", user);
      }
    }
  });

  socket.on("onLogin", (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log("Online", user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit("updateUser", updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit("listUsers", users);
    }
  });

  socket.on("onUserSelected", (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit("selectUser", existUser);
    }
  });

  socket.on("onMessage", (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit("message", message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit("message", message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit("message", {
          name: "Admin",
          body: "Sorry. I am not online right now",
        });
      }
    }
  });
});

console.log('estas son las llaves', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY, process.env.MAILTO )
// const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY, MAILTO } = process.env;

// webPush.setVapidDetails(
//   MAILTO,
//   PUBLIC_VAPID_KEY,
//   PRIVATE_VAPID_KEY
// );


httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });


// back_urls: {
//   success: `http://localhost:3001/api/coins/pagos/${product.idaux}`,
//   failure: "http://localhost:3001/api/coins/buy",
//   pending: "http://localhost:3001/api/coins/buy",
// },
// auto_return: "approved",