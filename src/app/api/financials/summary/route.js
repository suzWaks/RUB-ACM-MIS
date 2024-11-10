import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";

export const GET = async () => {
  try {
    await connectToDB();

    // Aggregate total income
    const totalIncomeResult = await financials.aggregate([
      { $match: { type: "Income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    // Aggregate total expense
    const totalExpenseResult = await financials.aggregate([
      { $match: { type: "Expense" } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    // Calculate total balance (Income - Expense)
    const totalIncome = totalIncomeResult[0]?.totalIncome || 0;
    const totalExpense = totalExpenseResult[0]?.totalExpense || 0;
    const totalBalance = totalIncome - totalExpense;

    // Return the newly created financial record as JSON
    return new Response(
      JSON.stringify({
        totalIncome: totalIncome,
        totalBalance: totalBalance,
        totalExpense: totalExpense,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error while fecthing Summary Financial Info: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
