import { connectToDB } from "../../../../utils/database";
import members from "../../../models/members";
import users from "../../../models/users";

export const DELETE = async (requests) => {
  try {
    await connectToDB();

    const { memberIds } = await requests.json();

    if (!memberIds || memberIds.length === 0) {
      return new Response("No member IDs provided", { status: 400 });
    }

    const membersToDelete = await members.find({ _id: { $in: memberIds } });
    if (membersToDelete.length === 0) {
      return new Response("No members found with the provided IDs", {
        status: 404,
      });
    }

    // Extracting the corresponding userIDs from the members
    const userIds = membersToDelete
      .map((member) => member.userID)
      .filter((userID) => userID); // This filters out undefined/null values

    // Delete the members
    await members.deleteMany({ _id: { $in: memberIds } });

    // If there are user IDs, delete the corresponding users
    if (userIds.length > 0) {
      await users.deleteMany({ _id: { $in: userIds } });
    }

    return new Response(
      "Members and corresponding users deleted successfully",
      { status: 200 }
    );
  } catch (error) {
    console.log("Error during deletion: ", error);
    return new Response("Failed to delete members and users", {
      status: 500,
    });
  }
};
