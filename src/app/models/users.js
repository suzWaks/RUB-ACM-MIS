import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
  },
  stdID: {
    type: String,
    required: [true, "Student ID is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});

const users = models.users || model("users", UserSchema);
export default users;
