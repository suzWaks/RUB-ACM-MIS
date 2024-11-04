import { connectToDB } from "../../../../utils/database";
import attendance from "../../../../models/attendance";

export const PATCH = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body to get attendanceID and status
    const { attendanceID, status } = await req.json();

    console.log("Parsed Request Body for Update:", { attendanceID, status });

    // Update the attendance record
    const updatedAttendance = await attendance.findByIdAndUpdate(
      attendanceID,
      { status }, // Update the status
      { new: true, runValidators: true } // Return the updated document and validate
    );

    // Check if the record was found and updated
    if (!updatedAttendance) {
      return new Response(
        JSON.stringify({
          message: "Attendance record not found.",
        }),
        { status: 404 }
      );
    }

    // Return the updated attendance record
    return new Response(JSON.stringify(updatedAttendance), {
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
