import { connectToDB } from "../../../../utils/database";
import events from "../../../../models/events";
import attendance from "../../../../models/attendance";

//GET (READ)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const event = await events.findById(params.id);

    if (!event) {
      return new Response(
        JSON.stringify({ message: "No event found" }, { status: 404 })
      );
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch events", { status: 500 });
  }
};

//PATCH (Update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const updates = await request.json();

    const updatedEvent = await members.findByIdAndUpdate(
      params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return new Response("No Event found", { status: 404 });
    }

    // Return the updated event document
    return new Response(JSON.stringify(updatedEvent), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to update member", { status: 500 });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the event by ID
    const event = await events.findById(params.id);
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    // Find and delete all attendance records associated with this event
    await attendance.deleteMany({ eventID: params.id });

    // Delete the event itself
    await events.findByIdAndDelete(params.id);

    return new Response(
      "Event and corresponding attendance deleted successfully",
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete event", { status: 500 });
  }
};
