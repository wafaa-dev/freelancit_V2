const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGO_URI"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDb connected ...");
  } catch (error) {
    console.error("Failed to connect to the DB");
  }
};

module.exports = connectDB;
