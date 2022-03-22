const mongoose = require('mongoose')
const Student = require('./students.model.js')

const sortByName = async()=>{
    try{
        return await Student.aggregate([
            {
                $sort:{
                    name:1
                }
            }
        ])
    }
    catch(e){
        console.log(e);
    }
}
const sortBySemester = async()=>{
    try{
        return await Student.aggregate([
            {
                $sort:{
                    semester:1
                }
            }
        ])
    }
    catch(e){
        console.log(e);
    }
}
const sortByBatch = async()=>{
    try{
        return await Student.aggregate([
            {
                $sort:{
                    batch:1
                }
            }
        ])
    }
    catch(e){
        console.log(e);
    }
}
module.exports={
    sortByName,
    sortByBatch,
    sortBySemester
}