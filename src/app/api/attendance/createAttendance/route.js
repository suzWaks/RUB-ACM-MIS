import { connectToDB } from "../../../../utils/database";
import events from "../../../../models/events";
import attendance from "../../../../models/attendance";
import members from "../../../../models/members";

export const POST = async (req) => {
  try {
    await connectToDB();
    // Parse request body
    const { eventID, memberIDs } = await req.json();

    // Validate input
    if (
      !eventID ||
      !memberIDs ||
      !Array.isArray(memberIDs) ||
      memberIDs.length === 0
    ) {
      return new Response(
        JSON.stringify(
          {
            message: "Event ID and an array of Member IDs are required.",
          },
          { status: 400 }
        )
      );
    }

    // Prepare an array to hold attendance records
    const attendanceRecords = [];

    // Iterate over memberIDs and create attendance records
    for (const memberID of memberIDs) {
      // Create a new attendance record for each member
      const newAttendance = new attendance({
        eventID,
        memberID,
        status: true, // Default to true if not provided
      });

      // Save the attendance record and push it to the array
      const savedAttendance = await newAttendance.save();
      attendanceRecords.push(savedAttendance);
    }

    // Return the saved attendance records
    return new Response(JSON.stringify(attendanceRecords), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating attendance:", error);

    return new Response(
      JSON.stringify({
        message: "An error occurred while creating attendance.",
      }),
      { status: 500 }
    );
  }
};
