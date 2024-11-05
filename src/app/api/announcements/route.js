import announcments from "../../../models/annoucements";
import { connectToDB } from "../../../utils/database";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const POST = async (req, res) => {
  try {
    //Since we have session in the front end we can get the session ID from the front end

    const {
      announcement_title,
      description,
      tags = [],
      created_by,
    } = await req.json();

    if (!announcement_title) {
      return new Response(
        JSON.stringify({ message: "Announcement is a required field" }),
        { status: 422 }
      );
    }
    // Connect to the database
    await connectToDB();

    // Create a new announcement
    const announcement = new announcments({
      announcement_title,
      description,
      tags,
      created_by,
    });

    const newAnnouncement = await announcement.save();

    return new Response(JSON.stringify(newAnnouncement), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error adding announcement",
      }),
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
      // Fetch a specific announcement by ID
      const announcement = await announcments.findOne({
        _id: new ObjectId(id),
      });

      if (!announcement) {
        return NextResponse.json(
          { message: "Announcement not found" },
          { status: 404 }
        );
      }

      // Return the specific announcement
      return NextResponse.json(announcement, { status: 200 });
    } else {
      // Fetch all announcement
      const announcementAll = await announcments.find();

      // Return all announcement
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
