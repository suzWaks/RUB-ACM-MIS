import { connectToDB } from "../../../../utils/database";
import members from "../../../../models/members";
import attendance from "../../../../models/attendance";
import users from "../../../../models/users";

//GET (READ)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const member = await members.findById(params.id).populate("attendance");

    if (!member) {
      return new Response(
        JSON.stringify({ message: "Member not found" }, { status: 404 })
      );
    }

    return new Response(JSON.stringify(member), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch member", { status: 500 });
  }
};

//PATCH (Update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const updates = await request.json();

    const updatedMember = await members.findByIdAndUpdate(
      params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMember) {
      return new Response("Member not found", { status: 404 });
    }

    // Return the updated member document
    return new Response(JSON.stringify(updatedMember), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to update member", { status: 500 });
  }
};

//DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const member = await members.findById(params.id);
    if (!member) {
      return new Response("Member not found", { status: 404 });
    }

    const userID = member.userID;

    //Deleteing data from members collection
    await members.findByIdAndDelete(params.id);

    //Deleting data from users collection
    await users.findByIdAndDelete(userID);

    return new Response("Member deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete member", { status: 500 });
  }
};
