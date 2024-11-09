import { Schema, model, models } from "mongoose";

const overallBudgetSchema = new Schema(
  {
    balanceUsed: {
      type: Number,
      default: 0,
      required: [true, "Balance used is required"],
    },
    totalBudget: {
      type: Number,
      required: [true, "Total budget is required"],
    },
  },
  { timestamps: true }
);

const OverallBudget =
  models.OverallBudget || model("OverallBudget", overallBudgetSchema);
export default OverallBudget;
