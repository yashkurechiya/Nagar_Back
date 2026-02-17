import mongoose from 'mongoose'

const taxSchema = new mongoose.Schema({
  taxId: String,
  units: Number,
  amount: Number,
  paymentId: String,
  receiptNumber: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Tax = mongoose.model('Tax', taxSchema);
