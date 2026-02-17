import Complaint from '../models/Complaints.js';
import analyze from '../services/ml-services.js'
import { uploadToCloudinary } from '../utils/uploadCloudinary.js';

export const createComplaint = async (req, res) => {
    try {
        const { title, category } = req.body;
        const file = req.file;
 
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const uploadedImage = await uploadToCloudinary(file.buffer, "complaints/before")
        
        const mlResult = await analyze(file.buffer, file.originalname);
        

        const priorityMap = {
            Low: "Low",
            Medium: "Medium",
            High: "High"
        }
        const complaint = await Complaint.create({
            user:req.user.id,
            title, category, priority: priorityMap[mlResult.severity] || "Medium",

            beforeImage: {
                url: uploadedImage.secure_url
            },
            aiAnalysis: {
                issueType: mlResult.issueType,
                severity: mlResult.severity,
                description: mlResult.description,
                rawCaption: mlResult.rawCaption
            },
            detections: mlResult.detections,

        });

        res.status(201).json({
            message: "Complaint created successfully",
            complaint
        });

    } catch (error) {
        console.error("Create complaint error", error);
        res.status(500).json({
            message: "Failed to create complaint"
        });
    }
}

export const getComplaints = async (req, res) => {
    try {
        const response = await Complaint.find({});

        return res.status(200)
            .json({ message: "all complaints", response })
    } catch (error) {

    }
}

export const myComplaints = async(req, res) => {
    try {
        const response = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });

        res.json(response)
    } catch (error) {
            console.log(error);
            
    }
}

// export default createComplaint;