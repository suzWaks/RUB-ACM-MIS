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
    category: {
      type: String,
      enum: [
        "Event", //Income or Expense
        "Lottery Sales", //Income
        "Supplies", //Expense
        "Donations", //Income
        "ITS Service", //Income
        "Miscellaneous Income", //Income
        "Miscellaneous Expense", //Expense
      ],
      required: [true, "Category is required"],
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
