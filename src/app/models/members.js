import { Schema, models, model } from "mongoose";

const MemberSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: [true, "Student name is required"],
    },
    std_id: {
      type: String,
      required: [true, "Student ID is required"],
    },
    programme: {
      type: String,
      required: false,
    },
    year: {
      type: String,
      required: [true, "year is required"],
    },
    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    department: {
      type: String,
      required: [true, "department is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: [true, "Gender is required"],
    },
    designation: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const members = models.members || model("members", MemberSchema);
export default members;
