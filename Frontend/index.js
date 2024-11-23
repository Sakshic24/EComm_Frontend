const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoDB = require("./db");

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors());
app.use(express.json());
app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

