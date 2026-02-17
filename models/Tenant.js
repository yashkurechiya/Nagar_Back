import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  address: String,
  landlordEmail: String,
  wardNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Tenant = mongoose.model("Tenant", tenantSchema);
