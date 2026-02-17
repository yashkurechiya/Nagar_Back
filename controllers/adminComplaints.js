import Complaint from "../models/Complaints.js"
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id);
    if (complaint.status == "Pending") {
      complaint.status = "In Progress"
    }
    await complaint.save();
    return res.status(201)
      .json({ message: "Single Complaint", complaint })

  } catch (error) {
    console.log(error);
  }

}

export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "After image is required" });
    }

    // 1️⃣ Find complaint
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // 2️⃣ Enforce workflow
    if (complaint.status === "Pending") {
      return res.status(400).json({
        message: "Mark complaint In Progress before resolving"
      });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({
        message: "Complaint already resolved"
      });
    }

    // 3️⃣ Upload after-image
    const uploadedImage = await uploadToCloudinary(
      file.buffer,
      "complaints/after"
    );

    // 4️⃣ Update complaint
    complaint.afterImage = {
      url: uploadedImage.secure_url
    };
    complaint.status = "Resolved";
    complaint.updatedAt = new Date();

    await complaint.save();

    // 5️⃣ Return response
    return res.status(200).json({
      message: "Complaint resolved successfully",
      complaint
    });

  } catch (error) {
    console.error("Resolve complaint error:", error);
    res.status(500).json({
      message: "Failed to resolve complaint"
    });
  }

};

export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findByIdAndDelete(id);
   
    return res.status(201)
      .json({ message: "Complaint Rejected", complaint })

  } catch (error) {
    console.log(error);
  }
}