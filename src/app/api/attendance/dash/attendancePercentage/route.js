import { connectToDB } from "../../../../../utils/database";
import attendance from "../../../../models/attendance";
import members from "../../../../models/members";

export const GET = async () => {
  try {
    await connectToDB();

    // Aggregate attendance data by the academic year (1-4) from members schema
    const attendanceByYear = await attendance.aggregate([
      // Join attendance with the members collection
      {
        $lookup: {
          from: "members", // The name of the members collection
          localField: "memberID", // Field in attendance schema
          foreignField: "_id", // Field in members schema
          as: "memberDetails", // The alias for the joined data
        },
      },
      {
        $unwind: "$memberDetails", // Unwind the array of member details to access individual member data
      },
      {
        $group: {
          _id: "$memberDetails.year", // Group by the academic year (1-4)
          totalAttendance: { $sum: 1 }, // Count the total attendance records
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] }, // Count present records (status == true)
          },
        },
      },
      {
        $project: {
          year: "$_id", // Set the year in the output
          attendancePercentage: {
            $cond: {
              if: { $eq: ["$totalAttendance", 0] },
              then: 0, // If no attendance records, set percentage to 0
              else: {
                $multiply: [
                  { $divide: ["$totalPresent", "$totalAttendance"] },
                  100,
                ], // Calculate the attendance percentage
              },
            },
          },
        },
      },
      {
        $sort: { year: 1 }, // Sort by year in ascending order
      },
    ]);

    // Format the response to include percentages in 2 decimal places
    const attendancePercentageByYear = attendanceByYear.map((entry) => ({
      year: entry.year,
      attendancePercentage: entry.attendancePercentage.toFixed(2), // Format to 2 decimal places
    }));

    // Return the attendance percentages grouped by academic year
    return new Response(JSON.stringify({ data: attendancePercentageByYear }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error calculating attendance percentage by year:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
