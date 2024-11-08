import { connectToDB } from "../../../../utils/database";
import mongoose from "mongoose";
import events from "../../../../models/events";

export const GET = async () => {
  try {
    await connectToDB();

    const currentDate = new Date(); // Get the current date
    const upcomingEvents = await events
      .find({ start_date: { $gt: currentDate } })
      .sort({ start_date: 1 }) // Sort by start date in ascending order
      .limit(3); // Limit to the three soonest events

    console.log("The upcoming date: ", upcomingEvents);

    // Check if there are any events
    if (!upcomingEvents) {
      return new Response(
        JSON.stringify({ message: "No Upcoming Events found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Transform the events into the required format
    const formattedEvents = upcomingEvents.map((event) => ({
      name: event.event_name,
      date: event.start_date,
    }));

    return new Response(JSON.stringify(formattedEvents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Upcomming events: ", error);
    return new Response("Failed to fetch events", { status: 500 });
  }
};
