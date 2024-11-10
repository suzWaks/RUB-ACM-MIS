import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";
import members from "../../../models/members";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    const financialData = await financials.find({});

    // Loop through financial data and fetch member associated with each 'createdBy'
    const financialDataWithMemberName = await Promise.all(
      financialData.map(async (item, index) => {
        // Fetch member by 'createdBy' (ObjectId)
        const member = await members.findOne({ userID: item.createdBy });

        // Create the response object with required structure
        return {
          id: item._id.toString(), // custom id, starting from 1
          amount: item.amount,
          type: item.type,
          description: item.description,
          category: item.category,
          createdBy: member ? member.name : null, // Only include the member's name
          createdOn: item.createdAt.toISOString().split("T")[0], // Date formatted to YYYY-MM-DD
        };
      })
    );

    return new Response(JSON.stringify(financialDataWithMemberName), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error while fecthing financial data: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
