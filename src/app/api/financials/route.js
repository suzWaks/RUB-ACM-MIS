import { connectToDB } from "../../../utils/database";
import financials from "../../../models/financials";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const { ObjectId } = mongoose.Types;

//Add a finance record
export const POST = async (req) => {
    try {
        const { amount, type, description = "", items = [], eventID = null, created_by } = await req.json();

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
            eventID,  // Optional field; it can be `null`
            createdBy,  // Automatically set from authenticated user
        });

        const savedFinancial = await newFinRecord.save();

        // Return the newly created financial record
        return new Response(JSON.stringify("New Finance Record Added"), {
            status: 201,
        });

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message, message: "Error adding finance record" }),
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
            const financialRecord = await financials.findOne({ _id: new ObjectId(id) });

            if (!financialRecord) {
                return NextResponse.json({ message: "Record not found" }, { status: 404 });
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
            const deletedRecord = await financials.findByIdAndDelete({ _id: new ObjectId(id) });

            if (!deletedRecord) {
                return NextResponse.json({ message: "Record not found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Record deleted" }, deletedRecord, { status: 200 });
        } else {
            // Delete all financial records
            const financeRecords = await financials.deleteMany();

            // Return all financial records
            return NextResponse.json({ message: "All financial records deleted" }, { status: 200 });
        }
    }
    catch (error) {
        return NextResponse.json(
            { error: error.message, message: "Error deleting the finance record" },
            { status: 500 }
        );
    }
}