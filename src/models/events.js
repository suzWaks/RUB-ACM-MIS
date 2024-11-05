import { Schema, models, model } from "mongoose";

const EventSchema = new Schema(
  {
    event_name: {
      type: String,
      required: [true, "Event Name is required"],
    },
    start_date: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    end_date: {
      type: Date,
      required: [true, "End Date is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    year: [
      {
        type: String
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const events = models.events || model("events", EventSchema);
export default events;
