import { connectToDB } from "../../../../utils/database";
import financials from "../../../../models/financials";

export const GET = async () => {
  try {
    await connectToDB();

    const recentTransactions = await financials
      .find() // Fetch all records
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
      .limit(2); // Limit to the 5 most recent transactions

    // Calculate the sum of all 5 recent transactions (amounts)
    const totalAmount = recentTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return new Response(
      JSON.stringify({
        recentTransactions: recentTransactions.map((transaction) => ({
          amount: transaction.amount,
          type: transaction.type,
          description: transaction.description, // Include description
        })),
        totalAmount,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error while fetching recent transactions: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
