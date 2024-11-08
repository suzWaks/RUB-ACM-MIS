import { connectToDB } from "../../../../utils/database";
import financials from "../../../../models/financials";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params; // Access id from params
    const {
      newAmount: amount,
      newType: type,
      newDescription: description,
      newItems: items,
    } = await req.json();

    await connectToDB();

    // Update the record using both amount and type
    const updatedRecord = await financials.findByIdAndUpdate(id, {
      amount,
      type,
      description,
      items,
    });

    // Ensure the updatedRecord exists before trying to respond
    if (!updatedRecord) {
      return NextResponse.json(
        { message: "Financial record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Financial Record with id ${id} is successfully updated` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error updating finance records" },
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
