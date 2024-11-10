import { connectToDB } from "../../../../utils/database";
import financials from "../../../models/financials";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params; // Access id from params
    const {
      userId,
      amount,
      type,
      category,
      description = "",
    } = await req.json();

    const createdBy = userId; // We extract the user ID from token/session.

    await connectToDB();

    // Update the record using both amount and type
    const updatedRecord = await financials.findByIdAndUpdate(id, {
      amount,
      type,
      category,
      description,
      createdBy,
    });

    // Ensure the updatedRecord exists before trying to respond
    if (!updatedRecord) {
      return new Response(
        JSON.stringify(
          { message: "could not update financital record" },
          { headers: { "Content-Type": "application/json", status: 404 } }
        )
      );
    }
    return new Response(
      JSON.stringify({ message: "Record Updated", updatedRecord }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error while updating transactions: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export async function GET(req, { params }) {
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

export async function DELETE(req, { params }) {
  try {
    // Connect to the database
    await connectToDB();

    const deletedRecord = await financials.findByIdAndDelete(params.id);

    console.log(params.id);

    if (!deletedRecord) {
      return new Response(JSON.stringify({ message: "Record not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Successfully deleted record, return status 200 with message
    return new Response(
      JSON.stringify({ message: "Record deleted", deletedRecord }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error while deleting transactions: ", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
