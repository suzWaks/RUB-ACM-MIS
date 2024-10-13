import { connectToDB } from "../../../../utils/database";
import events from "../../../../models/events";
import members from "../../../../models/members";
import attendance from "../../../../models/attendance";

export const POST = async (request) => {
  try {
    await connectToDB();

    const {
      event_name,
      start_date,
      end_date,
      venue,
      time,
      registeredMember,
      createdBy,
    } = await request.json();

    if (
      !event_name ||
      !start_date ||
      !end_date ||
      !venue ||
      !time ||
      !createdBy
    ) {
      return new Response("All required fields must be provided", {
        status: 400,
      });
    }

    // Ensure that the member who is creating the event exists
    const creator = await members.findById(createdBy);
    if (!creator) {
      console.log(createdBy);
      return new Response("Member creating the event not found", {
        status: 404,
      });
    }

    // Convert registeredMember emails to ObjectIds
    const registeredMemberIDs = await Promise.all(
      registeredMember.map(async (email) => {
        const member = await members.findOne({ email });
        if (!member) {
          console.error(`Member with email ${email} not found`);
          throw new Error(`Member with email ${email} not found`);
        }
        return member._id; // Return ObjectId of the found member
      })
    );

    // Create the event
    const newEvent = new events({
      event_name: event_name,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      venue: venue,
      time: time,
      registeredMember: registeredMemberIDs || [],
      createdBy: createdBy,
    });

    await newEvent.save();

    // Check if registeredMemberIDs is an array and is not empty
    if (registeredMemberIDs.length > 0) {
      const attendancePromises = registeredMemberIDs.map(async (memberID) => {
        // Create attendance record for each registered member
        const newAttendance = new attendance({
          eventID: newEvent._id,
          memberID: memberID,
          status: true, // Default to true, as per schema
        });
        console.log(`Creating attendance for memberID: ${memberID}`);
        return newAttendance.save();
      });

      // Wait for all attendance records to be created
      await Promise.all(attendancePromises);
      console.log(
        `Attendance records created for event: ${newEvent.event_name}`
      );
    } else {
      console.log("No registered members found for attendance creation.");
    }

    return new Response(JSON.stringify(newEvent), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating new event and attendance: ", error);
    return new Response("Failed to create new event and attendance", {
      status: 500,
    });
  }
};
