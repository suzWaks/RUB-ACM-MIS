import { connectToDB } from "../../../../utils/database";
import financials from "../../../../models/financials";

export const GET = async () => {
  try {
    await connectToDB();

    const incomeByCategory = await financials.aggregate([
      {
        $match: {
          type: "Income", // Only consider income records
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalIncome: { $sum: "$amount" }, // Calculate total income per category
        },
      },
      {
        $sort: { totalIncome: -1 }, // Sort by total income in descending order
      },
      {
        $limit: 1, // Limit to 1 document, the highest earning category
      },
      {
        $project: {
          maxIncome: "$totalIncome", // Store the highest income as maxIncome
        },
      },
    ]);

    // Now use the maxIncome to calculate totalLevel for each category
    const maxIncome = incomeByCategory[0]?.maxIncome || 0;

    const incomeByCategoryWithLevel = await financials.aggregate([
      {
        $match: {
          type: "Income", // Only consider income records
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalIncome: { $sum: "$amount" }, // Calculate total income per category
        },
      },
      {
        $project: {
          category: "$_id", // Rename _id to category
          totalIncome: 1, // Include total income
          totalLevel: {
            $cond: {
              if: { $eq: [maxIncome, 0] }, // Check if maxIncome is 0
              then: 0, // Set totalLevel to 0 if maxIncome is 0
              else: {
                $round: [
                  {
                    $multiply: [{ $divide: ["$totalIncome", maxIncome] }, 100],
                  },
                  0,
                ], // Round to integer
              },
            },
          },
        },
      },
      {
        $sort: { totalIncome: -1 }, // Sort by total income
      },
    ]);

    console.log(incomeByCategoryWithLevel);

    return new Response(JSON.stringify(incomeByCategoryWithLevel), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error while fecthing Income with category Info: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
