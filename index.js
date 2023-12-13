const express=require("express");

const cors = require("cors");
const { userController } = require("./controller/user.controller");
const { connection } = require("./db");
const { authentication } = require("./middleware/authentication");
const { employeeController } = require("./controller/employee.controller");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use("/user",userController);

app.use(authentication)

app.use("/employee",employeeController);

app.get("/", (req, res) => {
    res.send("HomePage for Employee Management");
  });

  app.listen( 8000, async () => {
    try {
      await connection;
      console.log("Connected to DataBase(MongoDB)");
    } catch (err) {
      console.log(err);
      console.log("error while connecting to DataBase(MongoDB)");
    }
    console.log(`App is running on port 8000`);
  });
  
  