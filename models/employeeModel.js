const mongoose =require("mongoose");

const employeeSchema=mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
	department:{type:String,enum:['Tech','Marketing','Operations']},
    salary:{type:String,required:true},		
    date:{type:String,required:true},
})
// //- First Name
// - Last Name
// - Email
// - Department (Select Tag with Tech, Marketing, and Operations as options)
// - Salary
const EmployeeModel=mongoose.model("employee",employeeSchema);

module.exports={
    EmployeeModel
}