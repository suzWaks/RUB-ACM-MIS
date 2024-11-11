import { connectToDB } from "../../../../../utils/database";
import attendance from "../../../../models/attendance";

export const GET = async () => {
  try {
    await connectToDB();

    // Step 1: Filter records to only include the year 2024 and calculate attendance percentage by month
    const attendanceData = await attendance.aggregate([
      {
        $match: {
          date: {
            $gte: new Date("2024-01-01"),
            $lt: new Date("2025-01-01"),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
          },
          totalAttendance: { $sum: 1 },
          totalPresent: { $sum: { $cond: ["$status", 1, 0] } },
        },
      },
      {
        $project: {
          month: "$_id.month",
          attendancePercentage: {
            $cond: {
              if: { $eq: ["$totalAttendance", 0] },
              then: 0,
              else: {
                $multiply: [
                  { $divide: ["$totalPresent", "$totalAttendance"] },
                  100,
                ],
              },
            },
          },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    // Step 2: Create an array to represent each month in 2024, initializing all with 0% attendance
    const monthlyAttendance = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      attendancePercentage: 0,
    }));

    // Step 3: Fill in the calculated attendance percentages for months that have data
    attendanceData.forEach((data) => {
      monthlyAttendance[data.month - 1].attendancePercentage =
        data.attendancePercentage;
    });

    // Extract only the percentages for the final response
    const attendancePercentages = monthlyAttendance.map(
      (entry) => entry.attendancePercentage
    );

    return new Response(JSON.stringify({ data: attendancePercentages }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calculating monthly attendance percentage:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
