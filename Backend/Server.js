const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyparser = require("body-parser");
const dotenv=require("dotenv")
const food=require("./Routes/FoodRoute");
const cloath=require("./Routes/CloathRoute");
const user = require("./Routes/UserRoute")
const order=require("./Routes/OrderRoute");
const order1=require("./Routes/Order1Route");
const cart=require("./Routes/cartRoute");
dotenv.config()
const app=express();
const port = 4006;


const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
};
app.use("/api",food)
app.use("/api",cloath)
app.use("/images",express.static('uploads'))
app.use("/api",user);
app.use("/api",order);
app.use("/api",order1);
app.use("/api",cart);



// Connect to Database
connectDB();
app.use(express.json())
app.use(cors())

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
