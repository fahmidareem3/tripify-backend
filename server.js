const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();
const auth = require("./routes/auth");
const flight = require("./routes/flight");
const booking = require("./routes/booking");
const invoice = require("./routes/invoice");
const upload = require("./routes/upload");
const fileUpload = require("express-fileupload");
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(errorHandler);

app.use("/api/auth", auth);
app.use("/api/flights", flight);
app.use("/api/booking", booking);
app.use("/api/invoice", invoice);
app.use("/api/upload", upload);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
