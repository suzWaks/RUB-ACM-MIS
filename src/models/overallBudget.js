import { Schema, model, models } from "mongoose";

const FinancialSchema = new Schema(
  {
    balanceUsed: {
      type: Number,
      default: 0,
      required: [true, "Amount is required"],
    },
    totalBudget: {
      type: Number,
      default: 0,
      required: [true, "Amount is required"],
    },
  },
  { timestamps: true }
);

const financials = models.financials || model("financials", FinancialSchema);
export default financials;
