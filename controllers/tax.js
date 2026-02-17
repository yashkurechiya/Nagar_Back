import { Tax } from "../models/Tax.js";

export const taxpay = async(req, res) => {
    try {

     const response = await Tax.find({});

    return  res.status(201).json({
        response,
        message:"Get all tax"
     })
        
    } catch (error) {
        console.log(error);
    }
}