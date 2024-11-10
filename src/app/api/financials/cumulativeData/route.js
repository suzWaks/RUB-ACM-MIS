import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Get the current year (2024 in this case)
    const currentYear = new Date().getFullYear();

    // Get all the financial records for the current year
    const records = await financials.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`), // Start of the year
            $lt: new Date(`${currentYear + 1}-01-01`), // Start of next year
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          amount: 1,
          type: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month", type: "$type" },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // Initialize an object to store monthly data for income, expense, and net balance
    const monthlyData = {
      "Net Balance": Array(12).fill(0),
      "Total Expense": Array(12).fill(0),
      "Total Income": Array(12).fill(0),
    };

    // Populate the monthlyData object based on the aggregated records
    records.forEach((record) => {
      const monthIndex = record._id.month - 1; // Zero-based index for months
      if (record._id.type === "Expense") {
        monthlyData["Total Expense"][monthIndex] = record.totalAmount;
      } else if (record._id.type === "Income") {
        monthlyData["Total Income"][monthIndex] = record.totalAmount;
      }
    });

    // Calculate the net balance for each month
    for (let i = 0; i < 12; i++) {
      monthlyData["Net Balance"][i] =
        monthlyData["Total Income"][i] - monthlyData["Total Expense"][i];
    }

    // Format the response
    const responseData = [
      {
        label: "Net Balance",
        data: monthlyData["Net Balance"],
      },
      {
        label: "Total Expense",
        data: monthlyData["Total Expense"],
      },
      {
        label: "Total Income",
        data: monthlyData["Total Income"],
      },
    ];

    // Return the formatted data
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error while fetching financial summary: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
