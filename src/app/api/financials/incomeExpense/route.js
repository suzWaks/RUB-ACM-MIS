import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";

// export const GET = async () => {
//   try {
//     // Connect to the database
//     await connectToDB();
//     // Fetch the overall budget document
//     const budget = await OverallBudget.findOne();

//     console.log("Budget Data: ", budget);
//     if (!budget) {
//       return new Response(JSON.stringify({ message: "Budget not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     //calculations
//     const balanceUsed = budget.balanceUsed;
//     const totalBudget = budget.totalBudget;
//     const balanceRemaining = totalBudget - balanceUsed;

//     return new Response(JSON.stringify({ balanceUsed, balanceRemaining }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.log("Error while fecthing overallBudget: ", error);
//     return new Response(JSON.stringify({ message: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    const result = await financials.aggregate([
      {
        $group: {
          _id: "$type", // Group by "Income" or "Expense"
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Initialize totals for income and expense
    let totalIncome = 0;
    let totalExpense = 0;

    // Loop through the result to assign values
    result.forEach((item) => {
      if (item._id === "Income") {
        totalIncome = item.totalAmount;
      } else if (item._id === "Expense") {
        totalExpense = item.totalAmount;
      }
    });

    // Calculate the overall balance
    const overallBalance = totalIncome - totalExpense;

    // Return the response
    return new Response(
      JSON.stringify({
        income: totalIncome,
        expense: totalExpense,
        balance: overallBalance,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error while fecthing overallBudget: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
