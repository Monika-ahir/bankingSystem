const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5500;

connectDB();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the Banking System!");
});
app.use("/api/customers", require("./routes/customerRoutes.js"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
