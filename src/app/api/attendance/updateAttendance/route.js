import { connectToDB } from "../../../../utils/database";
import attendance from "../../../models/attendance";

export const PATCH = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body to get attendanceData
    const { attendanceData, department, year } = await req.json();

    console.log("Parsed Request Body for Update:", attendanceData);

    // Update attendance status for each student
    const updatedAttendancePromises = attendanceData.map(async (student) => {
      // Find the attendance record by memberID, date, department, and year
      const attendanceRecord = await attendance.findOne({
        memberID: student.memberId, // Use the correct field name
        date: student.date,
        department: department, // Include department filter
        year: year, // Include year filter
      });

      if (attendanceRecord) {
        // Update the status based on the current value
        attendanceRecord.status = student.status;
        await attendanceRecord.save(); // Save the updated record
      } else {
        // Handle the case if no attendance record is found
        console.log(
          `No attendance record found for ${student.memberId} on ${student.date}`
        );
      }
    });

    // Wait for all updates to finish
    await Promise.all(updatedAttendancePromises);

    console.log("The attendance promise", updatedAttendancePromises);
    // Return the updated attendance record
    return new Response(
      JSON.stringify({ message: "Attendance updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
