const express = require("express");
const connectDB = require("./config/db.js");
const config = require("config");
const path = require("path");

//* Init app
const app = express();

connectDB();

//* Init middleware
app.use(express.json());
// app.use(express.json({extended :false}));

//* Define Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/project", require("./routes/api/project"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || config.get("PORT");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
