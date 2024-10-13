import { connectToDB } from "../../../../utils/database";
import events from "../../../../models/events";

// GET
export const GET = async () => {
  try {
    await connectToDB();

    const allEvents = await events.find();

    // Check if there are any events
    if (!allEvents || allEvents.length === 0) {
      return new Response(JSON.stringify({ message: "No events found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(allEvents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching events: ", error);
    return new Response("Failed to fetch events", { status: 500 });
  }
};
