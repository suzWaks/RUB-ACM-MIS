import announcments from "../../../../models/annoucements";
import members from "../../../../models/members";
import { connectToDB } from "../../../../utils/database";
import mongoose from "mongoose";

export const GET = async () => {
  try {
    await connectToDB();

    // Fetch the latest announcement
    const latestAnnouncement = await announcments
      .findOne() // Find one document
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .exec(); // Execute the query

    if (!latestAnnouncement) {
      return new Response(
        JSON.stringify({ message: "No announcements found." }),
        {
          status: 404,
        }
      );
    }

    // Fetch the creator's information using created_by field
    console.log(latestAnnouncement.created_by);
    const creator = await members
      .findOne({
        userID: new mongoose.Types.ObjectId(latestAnnouncement.created_by), // Use 'new' keyword here
      })
      .exec();

    if (!creator) {
      return new Response(JSON.stringify({ message: "Creator not found." }), {
        status: 404,
      });
    }

    // Format the createdAt date and time
    const createdAt = new Date(latestAnnouncement.createdAt);

    const response = {
      description: latestAnnouncement.description,
      time: createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }), // Format time (e.g., "8:00 PM")
      date: createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }), // Format date (e.g., "September 1, 2024")
      postedBy: creator.name,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching latest announcement:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
