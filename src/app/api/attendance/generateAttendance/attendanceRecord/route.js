import { connectToDB } from "../../../../../utils/database";
import events from "../../../../models/events";
import members from "../../../../models/members";
import attendance from "../../../../models/attendance";
export const POST = async (req) => {
  const { department, year, event, date } = await req.json();

  try {
    await connectToDB();

    let eventData = null;
    if (event) {
      eventData = await events.findOne({ event_name: event });
      console.log("Event Data: ", eventData);
    }

    //Find members based on department and year
    const membersQuery = {
      department,
      year,
    };

    const membersData = await members.find(membersQuery);
    console.log("MemberData: ", membersData);

    const attendanceRecord = membersData.map((member) => ({
      memberID: member._id,
      eventID: eventData ? eventData._id : null, // Only associate with an event if it exists
      date: date,
      status: false,
      department: department,
    }));
    console.log("Attendance Record: ", attendanceRecord);

    // Check if the attendance record is empty
    if (attendanceRecord.length === 0) {
      return new Response(
        JSON.stringify({
          message: "No members found for the given department and year.",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    await attendance.insertMany(attendanceRecord);

    const populatedAttendance = await attendance
      .find({ date, eventID: eventData ? eventData._id : null })
      .populate("memberID") // Populate the member details
      .populate("eventID"); // Populate event details (if needed)

    // Format the response
    const formattedAttendance = populatedAttendance.map((record) => {
      const member = record.memberID;
      const eventName = record.eventID ? record.eventID.event_name : "No event";
      return {
        id: member._id, // member ID
        name: member.name,
        department: member.department,
        studentId: member.std_id,
        year: member.year, // semester or year as per your schema
        event: eventName, // event name
        status: record.status, // status of the attendance
      };
    });

    return new Response(JSON.stringify(formattedAttendance), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Attendance: ", error);
    return new Response("Failed to fetch events", { status: 500 });
  }
};
