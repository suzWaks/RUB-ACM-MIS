import { connectToDB } from "../../../../utils/database";
import attendance from "../../../../models/attendance";

export const DELETE = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse request body
    const { attendanceIDs } = await req.json(); // Corrected to parse the array of IDs

    console.log("Parsed Request Body for Deletion:", { attendanceIDs }); // Updated log message

    // Validate input
    if (
      !attendanceIDs ||
      !Array.isArray(attendanceIDs) ||
      attendanceIDs.length === 0
    ) {
      console.log("Validation Error:", { attendanceIDs });
      return new Response(
        JSON.stringify({
          message: "An array of Attendance IDs is required.",
        }),
        { status: 400 }
      );
    }

    // Delete attendance records for the specified IDs
    const result = await attendance.deleteMany({
      _id: { $in: attendanceIDs }, // Match any attendanceID in the provided array
    });

    // Check if any records were deleted
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({
          message: "No attendance records found for the specified IDs.",
        }),
        { status: 404 }
      );
    }

    // Return a success message
    return new Response(
      JSON.stringify({ message: "Attendance records deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting attendance:", error);

    return new Response(
      JSON.stringify({
        message: "An error occurred while deleting attendance.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
