import { connectToDB } from "../../../utils/database";
import financials from "../../../models/financials";
import OverallBudget from "../../../models/overallBudget";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const { ObjectId } = mongoose.Types;

//Add a finance record
export const POST = async (req) => {
  try {
    const {
      amount,
      type,
      description = "",
      items = [],
      eventID = null,
    } = await req.json();

    // Validate required fields
    if (!amount || !type) {
      return new Response(
        JSON.stringify({ message: "Amount and type are required fields" }),
        { status: 422 }
      );
    }
    // Connect to the database
    await connectToDB();

    const createdBy = req.userId; // We extract the user ID from token/session.

    // Create new financial record
    const newFinRecord = new financials({
      amount,
      type,
      description,
      items,
      eventID, // Optional field; it can be `null`
      createdBy, // Automatically set from authenticated user
    });

    const savedFinancial = await newFinRecord.save();

    const overallBudget = await OverallBudget.findOne(); // Find the overall budget document
    if (overallBudget) {
      // Update the balanceUsed based on the transaction type
      if (type === "expense") {
        overallBudget.balanceUsed += amount; // Increase the used balance for expenses
      } else if (type === "income") {
        overallBudget.totalBudget -= amount; // Decrease the used balance for income (if it is a credit to the budget)
      }

      // Save the updated overall budget document
      await overallBudget.save();
    } else {
      console.error("Overall budget document not found.");
    }

    // Return the newly created financial record as JSON
    return new Response(JSON.stringify(savedFinancial), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error adding finance record",
      }),
      { status: 500 }
    );
  }
};

export async function GET(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch a specific financial record by ID
      const financialRecord = await financials.findOne({
        _id: new ObjectId(id),
      });

      if (!financialRecord) {
        return NextResponse.json(
          { message: "Record not found" },
          { status: 404 }
        );
      }

      // Return the specific financial record
      return NextResponse.json(financialRecord, { status: 200 });
    } else {
      // Fetch all financial records
      const financeRecords = await financials.find();

      // Return all financial records
      return NextResponse.json(financeRecords, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error fetching finance records" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the ID from query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Delete a specific financial record by ID
      const deletedRecord = await financials.findByIdAndDelete({
        _id: new ObjectId(id),
      });

      if (!deletedRecord) {
        return NextResponse.json(
          { message: "Record not found" },
          { status: 404 }
        );
      }

      const overallBudget = await OverallBudget.findOne();
      if (overallBudget) {
        if (deletedRecord.type == "Expense") {
          overallBudget.balanceUsed -= deletedRecord.amount;
        } else if ((deletedRecord.type = "Income")) {
          overallBudget.totalBudget -= deletedRecord.amount;
        }
        // Save the updated overall budget document
        await overallBudget.save();
      } else {
        console.error("Overall budget document not found.");
      }

      return NextResponse.json({ message: "Record deleted" }, deletedRecord, {
        status: 200,
      });
    } else {
      // Delete all financial records
      const financeRecords = await financials.deleteMany();
      // Assuming you want to reset the overall budget as well
      const overallBudget = await OverallBudget.findOne();
      if (overallBudget) {
        overallBudget.balanceUsed = 0;
        overallBudget.totalBudget = 20000; // Reset total budget if needed
        await overallBudget.save(); // Save the reset overall budget
      }
      // Return all financial records
      return NextResponse.json(
        { message: "All financial records deleted" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error deleting the finance record" },
      { status: 500 }
    );
  }
}
