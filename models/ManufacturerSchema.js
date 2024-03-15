import express from express;
import mongoose, {model} from "mongoose";

const ManufacturerSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    designation : String,
    mobile_number : String,
    whats_app : String,
    company_name:String,
    about_company : String,
    shareholder : String,
    tin : String,
    file : String,
    product:Array,
    product_quantity: Number,
    income: Number,

})


export default mongoose.model("Manufacturer", ManufacturerSchema)