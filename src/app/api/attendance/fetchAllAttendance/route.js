import { connectToDB } from "../../../../utils/database";
import attendance from "../../../models/attendance";
import members from "../../../models/members";
import events from "../../../models/events";

export const GET = async () => {
  try {
    await connectToDB();

    const records = await attendance.aggregate([
      {
        $lookup: {
          from: "members", // Join with members collection
          localField: "memberID",
          foreignField: "_id",
          as: "memberInfo",
        },
      },
      {
        $unwind: "$memberInfo", // Unwind memberInfo to access member fields
      },
      {
        $lookup: {
          from: "events", // Join with events collection
          localField: "eventID",
          foreignField: "_id",
          as: "eventInfo",
        },
      },
      {
        $unwind: {
          path: "$eventInfo",
          preserveNullAndEmptyArrays: true, // Allow eventInfo to be null if no event matches
        },
      },
      {
        $project: {
          id: "$_id", // Attendance ID
          stdID: "$memberInfo.std_id", // Student ID
          name: "$memberInfo.name", // Student name
          status: {
            $cond: {
              if: { $eq: ["$status", true] },
              then: "Present",
              else: "Absent",
            },
          }, // Attendance status
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // Date of attendance
          event_name: { $ifNull: ["$eventInfo.event_name", "No Event"] }, // Event name or "No Event" if null
        },
      },
    ]);

    return new Response(JSON.stringify(records), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating attendance:", error);

    return new Response(
      JSON.stringify({
        message: "An error occurred while updating attendance.",
      }),
      { status: 500 }
    );
  }
};
