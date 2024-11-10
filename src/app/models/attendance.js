import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "events",
    },
    memberID: {
      type: Schema.Types.ObjectId,
      ref: "members",
    },
    status: {
      type: Boolean,
      default: true,
      required: [true, "Status is Required"],
    },
  },
  { timestamps: true }
);

const attendance = models.attendance || model("attendance", AttendanceSchema);
export default attendance;
