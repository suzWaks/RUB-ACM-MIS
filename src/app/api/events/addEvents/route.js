import { connectToDB } from "../../../../utils/database";
import events from "../../../../models/events";
import members from "../../../../models/members";
import attendance from "../../../../models/attendance";
import users from "../../../../models/users";

export const POST = async (request) => {
  try {
    await connectToDB();

    const {
      event_name,
      event_date, // changed from start_date to event_date
      venue,
      time,
      registeredMember,
      createdBy,
      year, // new field added for years related to the event
    } = await request.json();

    if (!event_name || !event_date || !venue || !time || !createdBy) {
      return new Response("All required fields must be provided", {
        status: 400,
      });
    }

    const creator = await users.findById(createdBy); // Use 'users' collection
    if (!creator) {
      return new Response("User creating the event not found", {
        status: 404,
      });
    }

    // // Convert registeredMember emails to ObjectIds (using the 'users' collection)
    // const registeredMemberIDs = await Promise.all(
    //   registeredMember.map(async (email) => {
    //     const user = await members.findOne({ email });
    //     if (!user) {
    //       console.error(`User with email ${email} not foundsss`);
    //       console.log("check: ", registeredMember)
    //       throw new Error(`User with email ${email} not foundsss`);
    //     }
    //     return user._id; // Return ObjectId of the found user
    //   })
    // );


    // Create the event
    const newEvent = new events({
      event_name: event_name,
      event_date: new Date(event_date), // updated to event_date
      venue: venue,
      time: time,
      // registeredMember: registeredMemberIDs || [],
      createdBy: createdBy,
      year: year || [], // add year array
    });

    await newEvent.save();

    // // Check if registeredMemberIDs is an array and is not empty
    // if (registeredMemberIDs.length > 0) {
    //   const attendancePromises = registeredMemberIDs.map(async (memberID) => {
    //     // Create attendance record for each registered member
    //     const newAttendance = new attendance({
    //       eventID: newEvent._id,
    //       memberID: memberID,
    //       status: true, // Default to true, as per schema
    //     });
    //     console.log(`Creating attendance for memberID: ${memberID}`);
    //     return newAttendance.save();
    //   });

    //   // Wait for all attendance records to be created
    //   await Promise.all(attendancePromises);
    //   console.log(
    //     `Attendance records created for event: ${newEvent.event_name}`
    //   );
    // } else {
    //   console.log("No registered members found for attendance creation.");
    // }


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
