const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    },
    accomodationStatus: {
      type: String,
      required: true
    },
    rentRequestAmount: {
      type: Number,
      required: true
    },
    monthlySalary: {
      type: Number,
      required: true
    },
    monthlyPaymentPlan: {
      type: String,
      required: true,
      default: "1 Month"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rent", RentSchema);
