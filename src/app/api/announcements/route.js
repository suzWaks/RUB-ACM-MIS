import { connectToDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import users from "../../../models/users";
import announcments from "@/models/annoucements";
import announcements from "@/models/annoucements"; 


const { ObjectId } = mongoose.Types;

export const POST = async (req, res) => {
  try {
    const { announcement_title, description, tags = [], created_by } = await req.json();

    console.log("Received Data:", { announcement_title, description, tags, created_by });

    if (!announcement_title) {
      return NextResponse.json(
        { message: "Announcement title is a required field" },
        { status: 422 }
      );
    }

    // Connect to the database
    await connectToDB();
    console.log("Database connected successfully.");

    // Handle created_by (convert to ObjectId if necessary)
    let createdByObjectId = null;
    if (created_by) {
      console.log("Looking up user by role:", created_by);
      const user = await users.findOne({ role: created_by });
      if (!user) {
        console.log("User with the specified role not found.");
        return NextResponse.json(
          { message: "User with specified role not found" },
          { status: 404 }
        );
      }
      createdByObjectId = user._id;
      console.log("User found:", user);
    }

    // Create a new announcement object
    const announcment = new announcements({
      announcement_title,
      description,
      tags,
      created_by: createdByObjectId,
    });
    

    // Save the announcement to the database
    const newAnnouncement = await announcment.save();
    console.log("Announcement created successfully:", newAnnouncement);

    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error("Error adding announcement:", error);
    return NextResponse.json(
      { error: error.message, message: "Error adding announcement" },
      { status: 500 }
    );
  }
};

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch a specific announcement by ID and populate the created_by field
      const announcement = await announcments.findOne({
        _id: new ObjectId(id),
      }).populate('created_by', 'role');  // Populate role field from the user collection

      if (!announcement) {
        return NextResponse.json(
          { message: "Announcement not found" },
          { status: 404 }
        );
      }

      // Return the specific announcement with the user's role
      return NextResponse.json(announcement, { status: 200 });
    } else {
      // Fetch all announcements and populate the created_by field
      const announcementAll = await announcments.find().populate('created_by', 'role'); // Populate role field

      // Return all announcements with user roles
      return NextResponse.json(announcementAll, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error fetching announcement" },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Delete a specific announcement record by ID
      const deletedAnnouncement = await announcments.findByIdAndDelete({
        _id: new ObjectId(id),
      });

      if (!deletedAnnouncement) {
        return NextResponse.json(
          { message: "Announcement not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Announcement deleted" },
        deletedAnnouncement,
        { status: 200 }
      );
    } else {
      // Delete all announcement records
      const announcementRecords = await announcments.deleteMany();

      // Return all announcement
      return NextResponse.json(
        { message: "All announcement deleted" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error deleting the announcement" },
      { status: 500 }
    );
  }
}
export const PUT = async (req) => {
  try {
    // Extract the ID from the query parameters (not the request body)
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    // Log the received data to ensure correctness
    const { announcement_title, description, tags = [], created_by } = await req.json();
    console.log("Received data to update:", { id, announcement_title, description, tags, created_by });

    if (!id) {
      return NextResponse.json(
        { message: "Announcement ID is required" },
        { status: 422 }
      );
    }

    if (!announcement_title) {
      return NextResponse.json(
        { message: "Announcement title is a required field" },
        { status: 422 }
      );
    }

    // Connect to the database
    await connectToDB();
    console.log("Database connected successfully.");

    // Handle created_by (convert to ObjectId if necessary)
    let createdByObjectId = null;
    if (created_by) {
      const user = await users.findOne({ role: created_by.role });
      if (!user) {
        return NextResponse.json(
          { message: "User with specified role not found" },
          { status: 404 }
        );
      }
      createdByObjectId = user._id;
    }

    // Update the announcement
    const updatedAnnouncement = await announcments.findByIdAndUpdate(
      id,
      {
        announcement_title,
        description,
        tags,
        created_by: createdByObjectId,
      },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAnnouncement, { status: 200 });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json(
      { error: error.message, message: "Error updating announcement" },
      { status: 500 }
    );
  }
};
