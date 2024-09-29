import { Schema, model, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    announcement_title: {
      type: String,
      required: [true, "Announcement title is required"],
    },
    description: {
      type: String,
      required: false,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "members",
    },
  },
  { timestamps: true }
);

const announcments =
  models.announcements || model("announcements", AnnouncementSchema);
export default announcments;
