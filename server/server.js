
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
const { apiValidation, signup, login } = require("./config/apiValidation");
const dbBanner = require("./dbSchemas/banner");
const dbCatgory = require("./dbSchemas/category");
const dbProduct =  require("./dbSchemas/product")
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
app.post("/api/signup", apiValidation(signup), require("./controllers/signup"));
app.use("/api/login", apiValidation(login), require("./controllers/login"));
app.use("/api/user", isAuth, require("./routes/user"));

app.use("/api/search-products/:name", require("./controllers/searchProduts"));

app.use("/api/cart", isAuth, require("./routes/cart"));
app.use("/api/order", isAuth, require("./routes/order"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/feedback", require("./controllers/feedback"));
app.use("/api/logout", isAuth, require("./controllers/logout"));




app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
