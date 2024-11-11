import { connectToDB } from "../../../../../utils/database";
import members from "../../../../models/members";

// PATCH (Update)
export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();

        console.log(params.id);
        // Parse JSON from the request body
        const updates = await request.json();
        console.log(updates);

        // Find and update the member document by ID
        const updatedMember = await members.findOneAndUpdate(
            { userID: params.id }, // Specify filter object
            { $set: updates }
        );
        console.log(updatedMember);

        if (!updatedMember) {
            return new Response("Member not found", { status: 404 });
        }

        console.log("Successful");

        // Return the updated member document
        return new Response(JSON.stringify(updatedMember), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Update error:", error); // Log error for debugging
        return new Response("Failed to update member", { status: 500 });
    }
};

