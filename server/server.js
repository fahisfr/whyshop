require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const fileupload = require("express-fileupload");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./config/errorHandler");
const isAuth = require("./middlewares/userAuthentication");

connectDB();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/home", require("./routes/home"));
app.use("/api/product", require("./routes/product"));
app.use("/api/shop", require("./routes/shop"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/auth", isAuth, require("./routes/auth"));

app.use("/api/search-products", require("./controllers/searchProduts"));

app.use("/api/cart", isAuth, require("./routes/cart"));
app.use("/api/order", isAuth, require("./routes/order"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/logout", isAuth, require("./controllers/logout"));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
