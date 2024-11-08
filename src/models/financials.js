import { Schema, model, models } from "mongoose";

const FinancialSchema = new Schema(
  {
    amount: {
      type: Number,
      default: 0,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: [true, "Type is required"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    eventID: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "events",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const financials = models.financials || model("financials", FinancialSchema);
export default financials;
