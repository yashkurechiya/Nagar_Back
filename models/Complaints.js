import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
    title: {
        type: String,
        required: [true, 'Complaint title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Road',
            'Water',
            'Electricity',
            'Garbage',
            'Other'
        ]
    },
    aiAnalysis : {
        issueType:String,
        severity : String,
        description: String,
        rawCaption: String
    },


    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    beforeImage: {
        url: String
    },

    afterImage: {
        url: String
    },
     detections: Array,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
