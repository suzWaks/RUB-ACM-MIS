import { connectToDB } from "../../../../utils/database";
import members from "../../../models/members";
import attendance from "../../../models/attendance";
import users from "../../../models/users";

//GET (READ)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const member = await members.findOne({ userID: params.id });

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

// PATCH (Update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    // Parse JSON from the request body
    const updates = await request.json();

    // Find and update the member document by ID
    const updatedMember = await members.findOneAndUpdate(
      { userID: params.id }, // Specify filter object
      { $set: updates },
      {
        new: true,           // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedMember) {
      return new Response("Member not found", { status: 404 });
    }

    console.log("Successful");

    // Return the updated member document
    return new Response(JSON.stringify(updatedMember), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Update error:", error); // Log error for debugging
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
