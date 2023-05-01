const fs = require("fs");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Flight = require("./models/Flights");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {});

// Read JSON files
const flights = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/flights.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Flight.create(flights);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Flight.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
