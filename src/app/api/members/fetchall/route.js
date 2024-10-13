import { connectToDB } from "../../../../utils/database";
import members from "../../../../models/members";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const member = await members.find();

    if (!member) {
      return new Response(
        JSON.stringify({ message: "No member data available" }, { status: 404 })
      );
    }

    return new Response(JSON.stringify(member), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        { message: "Error while fetching member data" },
        { status: 500 }
      )
    );
  }
};
