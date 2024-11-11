import { connectToDB } from "../../../../../utils/database";
import attendance from "../../../../models/attendance";
import members from "../../../../models/members";

export const GET = async () => {
  try {
    await connectToDB();

    const attendanceByYear = await attendance.aggregate([
      // Step 1: Lookup to join members based on memberID
      {
        $lookup: {
          from: "members", // Collection to join
          localField: "memberID", // Field in attendance
          foreignField: "_id", // Field in members
          as: "memberInfo", // Output array field
        },
      },
      // Step 2: Unwind the memberInfo array to get member details directly
      {
        $unwind: "$memberInfo",
      },
      // Step 3: Group by the member's year and calculate present and absent counts
      {
        $group: {
          _id: "$memberInfo.year", // Group by year
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", true] }, 1, 0] },
          }, // Count of present days
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", false] }, 1, 0] },
          }, // Count of absent days
        },
      },
      // Step 4: Sort by year for correct indexing
      {
        $sort: { _id: 1 },
      },
    ]);

    // Initialize arrays for each year index with 0 values
    const absent = [0, 0, 0, 0]; // Adjust length as needed for additional years
    const present = [0, 0, 0, 0]; // Adjust length as needed for additional years

    // Map results into the absent and present arrays
    attendanceByYear.forEach((data) => {
      const yearIndex = parseInt(data._id) - 1; // Assuming year 1 maps to index 0, etc.
      if (yearIndex >= 0 && yearIndex < absent.length) {
        absent[yearIndex] = data.totalAbsent;
        present[yearIndex] = data.totalPresent;
      }
    });

    return new Response(JSON.stringify({ absent, present }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Fetching Attendance By Year:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
