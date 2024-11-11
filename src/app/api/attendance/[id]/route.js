import { connectToDB } from "../../../../utils/database";
import attendance from "../../../models/attendance";

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params; // Access id from params
    const { date, status } = await req.json();

    await connectToDB();

    console.log(id);
    console.log(date);
    console.log(status);

    const finalStatus = status === "Present";
    console.log(finalStatus);

    // Update the record
    const updatedRecord = await attendance.findByIdAndUpdate(id, {
      date: date,
      status: finalStatus,
    });

    console.log(updatedRecord);
    // Ensure the updatedRecord exists before trying to respond
    if (!updatedRecord) {
      return new Response(
        JSON.stringify(
          { message: "could not update attendance record" },
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

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    const deletedRecord = await attendance.findByIdAndDelete(params.id);

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
};
