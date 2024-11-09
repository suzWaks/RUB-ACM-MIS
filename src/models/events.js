import { Schema, models, model } from "mongoose";

const EventSchema = new Schema(
  {
    event_name: {
      type: String,
      required: [true, "Event Name is required"],
    },
    event_date: {
      type: Date,
      required: [true, "Event Date is required"],
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
        type: String,
      },
    ],
    registeredMember: [
      {
        type: Schema.Types.ObjectId,
        ref: "members", 
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
