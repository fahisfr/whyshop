require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const PORT = 4000;
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const fileupload = require("express-fileupload");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./config/errorHandler");
const isAuth = require("./middlewares/userAuthentication");
const { apiValidation, signup, login } = require("./config/apiValidation");
const userControler = require("./controllers/user");
connectDB();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/home", require("./routes/home"));
app.use("/api/recommendations", require("./controllers/recommendations"));
app.use("/api/product", require("./routes/product"));
app.use("/api/shop", require("./routes/shop"));
app.post("/api/signup", apiValidation(signup), userControler.signup);
app.use("/api/login", apiValidation(login), userControler.login);
app.use("/api/user", require("./routes/user"));
app.use("/api/search-products/:name", require("./controllers/searchProduts"));

app.use("/api/cart", isAuth, require("./routes/cart"));
app.use("/api/order", require("./routes/order"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/logout", isAuth, userControler.logout);

app.post("/webhook", require("./controllers/verifyWebHook"));

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "public/index.html"))
// );

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
