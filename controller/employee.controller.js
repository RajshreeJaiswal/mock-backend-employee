const express=require("express");
const { EmployeeModel } = require("../models/employeeModel");

const employeeController=express.Router();

employeeController.get("/",async(req,res)=>{
    try{
        const page=parseInt(req.query.page)-1||0;
        const limit=parseInt(req.query.limit);
        const q=req.query.q || "";
        var sort=req.query.sort ;
        let department=req.query.department || "All";

        

        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy={};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }
        else{
            sortBy[sort[0]]="asc";
        }

        const employee=await EmployeeModel.find({$or:[{first_name:{$regex:q,$options:"i"}},
        {salary:{$regex:q,$options:"i"}},{department:{$regex:q,$options:"i"}}]})
        .sort(sortBy).skip(page*limit).limit(limit);
        const response={
            error:false,
            page:page+1,
            limit,
            employee
        }
        res.status(200).json(response);
    }
    catch(error){
        res.status(500).json({error:true,message:"server Error"});
    }
})

// create
employeeController.post("/create", async (req,res)=>{
    const{first_name,last_name,email,department,salary,date}=req.body;

    
    const Employee_data=await EmployeeModel.create({first_name,last_name,email,department,salary,date});
    res.send({data:Employee_data});
})

// update
employeeController.patch("/edit/:empId",async (req,res)=>{
    const empId=req.params.empId;

    const payload=req.body;
    await EmployeeModel.findOneAndUpdate({_id:empId},payload);
    res.send({message:`employee ${empId} Data updated`});
})

// delete
employeeController.delete("/delete/:empId",async (req,res)=>{
    const empId=req.params.empId;

    await EmployeeModel.findOneAndDelete({_id:empId});
    res.send({message:`employee ${empId} Data deleted`});
})



module.exports={
    employeeController
}