import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConn";
import homeRouter from "./routes/home";
import userRouter from "./routes/user";
import cartRouter from "./routes/cart";
import productsRouter from "./routes/products";
import orderRouter from "./routes/order";
import adminRouter from "./routes/admin";
import verifyWebHook from "./controllers/verifyWebHook";
import isAuth from "./middlewares/userAuthentication";
import PlaceOrder from "./controllers/placeOrder";
import { apiValidation, placeOrder } from "./middlewares/apiValidation";
import { getProductByName } from "./controllers/product";
import { getAllOrders } from "./controllers/order";
import { getUserOrderById } from "../src/controllers/order";
import { Request, Response, NextFunction } from "express";
import dbUser from "./dbSchemas/user";

const Port: number = 4000;
const app: Application = express();
connectDB();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/home", homeRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", isAuth, cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.post("/webhook", verifyWebHook);
app.use("/api/products", productsRouter);

app.get("/api/orders", getAllOrders);
app.get("/api/order/:id", isAuth, getUserOrderById);
app.get("/api/product/:name", getProductByName);
app.post("/api/place-order", isAuth, apiValidation(placeOrder), PlaceOrder);

// app.get("*", (req, res) =>
// fix the api 404 api routs set statues2 00 js file
//   res.sendFile(path.join(__dirname, "public/index.html"))
// );



app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ message: "somthing went worne" });
});

app.listen(Port, () => console.log(`Server is running on port ${Port}`));
