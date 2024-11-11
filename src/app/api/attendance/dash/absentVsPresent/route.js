import { connectToDB } from "../../../../../utils/database";
import attendance from "../../../../models/attendance";

export const GET = async () => {
  try {
    await connectToDB();

    // Aggregate attendance data to calculate total present and total absent
    const attendanceData = await attendance.aggregate([
      {
        $group: {
          _id: null, // Grouping everything together (no need for specific fields)
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] },
          }, // Count records where status is true (present)
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", false] }, 1, 0] },
          }, // Count records where status is false (absent)
        },
      },
    ]);

    // Extract total present and absent values from the aggregated data
    const totalPresent = attendanceData[0]?.totalPresent || 0;
    const totalAbsent = attendanceData[0]?.totalAbsent || 0;

    // Return the total present and absent counts in the response
    return new Response(JSON.stringify({ totalPresent, totalAbsent }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calculating attendance counts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
