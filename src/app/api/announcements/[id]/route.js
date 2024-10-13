import { connectToDB } from "../../../../utils/database";
import announcments from "../../../../models/annoucements";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {

        //to do: Update updateBy
        const { id } = params; // Access id from params
        const { newTitle: announcement_title, newDescription: description, newTags: tags } = await req.json();

        await connectToDB();

        // Update the record using both amount and type
        const updatedAnnouncement = await announcments.findByIdAndUpdate(
            id,
            { announcement_title, description, tags },
            { new: true, runValidators: true }
        );

        // Ensure the updatedRecord exists before trying to respond
        if (!updatedAnnouncement) {
            return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
        }

        return NextResponse.json({ message: `Announcement with id ${id} is successfully updated` }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message, message: "Error updating Announcement" },
            { status: 500 }
        );
    }
};
