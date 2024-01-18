require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const agentRouter = require("./routes/agents");
const ticketRouter = require("./routes/tickets");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.get("/", (req, res) => {
  res.send("i am alive!!!!!!!");
});
app.use("/agent", agentRouter);
app.use("/ticket", ticketRouter);

const main = () => {
  // Connect to MongoDB
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Application connected to mongoDB ......");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log("Something wnet wrong", e);
  }
};

main();
