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
