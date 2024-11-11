import { connectToDB } from "../../../../../utils/database";
import attendance from "../../../../models/attendance";

export const GET = async () => {
  try {
    await connectToDB();

    // Aggregate attendance data to calculate total present and total attendance
    const turnoutData = await attendance.aggregate([
      {
        $group: {
          _id: null, // We want to group everything together
          totalAttendance: { $sum: 1 }, // Count total attendance records
          totalPresent: { $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] } }, // Count present records
        },
      },
    ]);

    // Calculate the turnout rate
    const totalAttendance = turnoutData[0]?.totalAttendance || 0;
    const totalPresent = turnoutData[0]?.totalPresent || 0;

    const turnoutRate =
      totalAttendance > 0
        ? ((totalPresent / totalAttendance) * 100).toFixed(1)
        : "0.00"; // Avoid division by zero

    // Return the calculated turnout rate as a percentage
    return new Response(
      JSON.stringify({ turnoutRate: parseFloat(turnoutRate) }), // Parsing to float to return a numeric value
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error calculating turnout rate:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
