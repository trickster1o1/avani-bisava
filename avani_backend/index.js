const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const db = require("./config/db");
require("dotenv").config();
const app = express();
app.use(cors());
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const uploadRoute = require("./routes/uploadRoute");
const bannerRoute = require("./routes/bannerRoute");
const orderRoute = require("./routes/orderRoute");
const blogRoute = require("./routes/blogRoute");
const lovedProductRoute = require("./routes/lovedProductRoute");
const childCategoryImageRoute = require("./routes/childCategoryImageRoute");
const reviewRoute = require("./routes/reviewRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const contactUsRoute = require("./routes/contactUsRoute");
const helpRoute = require("./routes/helpRoute");
const aboutUsRoute = require("./routes/aboutUsRoute");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// connection to database
db.authenticate()
  .then((res) => console.log(`Database Connected`.bgYellow))
  .catch((err) => console.log(`Error:${err}`.red.inverse));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/banner", bannerRoute);
app.use("/api/order", orderRoute);
app.use("/api/lovedProduct", lovedProductRoute);
app.use("/api/childCategoryImage", childCategoryImageRoute);
app.use("/api/blog", blogRoute);
app.use("/api/review", reviewRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/contact", contactUsRoute);
app.use("/api/help", helpRoute);
app.use("/api/aboutus", aboutUsRoute);
app.use("/api/upload", uploadRoute);
let __variableOfChoice = path.resolve();
// console.log(path.join(__variableOfChoice, "/uploads"));
app.use("/uploads", express.static(path.join(__variableOfChoice, "/uploads")));

// error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.NODE_ENVIRONMENT === "development" ? "5000" : 5000;
app.listen(PORT, () =>
  console.log(`Server Running on Port ${PORT}`.cyan.inverse)
);
