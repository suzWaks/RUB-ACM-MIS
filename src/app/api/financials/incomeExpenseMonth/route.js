import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";

export const GET = async () => {
  try {
    await connectToDB();

    const currentMonth = new Date();
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    // Perform aggregation to group by week and type (Income/Expense)
    const results = await financials.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $addFields: {
          weekOfMonth: {
            $ceil: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] },
          },
        },
      },
      {
        $group: {
          _id: { week: "$weekOfMonth", type: "$type" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.week",
          totals: {
            $push: {
              type: "$_id.type",
              totalAmount: "$totalAmount",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Initialize arrays for income and expenses with 0s for each week
    const weeksCount = 4;
    const incomeData = Array(weeksCount).fill(0);
    const expensesData = Array(weeksCount).fill(0);

    // Populate income and expense data for each week
    results.forEach((weekData) => {
      const weekIndex = weekData._id - 1; // Adjust to 0-based index
      weekData.totals.forEach((item) => {
        if (item.type === "Income") {
          incomeData[weekIndex] = item.totalAmount;
        } else if (item.type === "Expense") {
          expensesData[weekIndex] = item.totalAmount;
        }
      });
    });

    // Format the final response
    const response = [
      {
        label: "Expenses",
        data: expensesData,
      },
      {
        label: "Income",
        data: incomeData,
      },
    ];

    // Return the result as a JSON response
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching financial data:", error);
    return new Response("Failed to fetch financial data", {
      status: 500,
    });
  }
};
