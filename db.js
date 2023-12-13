const mongoose =require("mongoose")
const connection=mongoose.connect("mongodb+srv://rajshreejaiswal0907:Jaiswal123@cluster0.rvrr6lm.mongodb.net/dbEmployees?retryWrites=true&w=majority")
module.exports={
     connection
}