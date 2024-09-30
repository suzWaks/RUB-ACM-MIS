import { connectToDB } from "../../../utils/database";
import users from "../../../models/users";
import members from "../../../models/members";
import events from "../../../models/events";
import attendance from "../../../models/attendance";
import announcments from "../../../models/annoucements";
import financials from "../../../models/financials";

import memberData from "../../../utils/demodata/members.json";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    //Clear exisiting data
    await members.deleteMany({});

    //Insert Demo Data
    await members.insertMany(memberData);

    return new Response(
      JSON.stringify({ message: "Student Data Successfully Initialized" }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Error Initializing Database" }),
      { status: 500 }
    );
  }
};
