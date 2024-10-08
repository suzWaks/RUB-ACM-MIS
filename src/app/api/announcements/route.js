import announcments from "../../../models/annoucements";
import { connectToDB } from "../../../utils/database";

export const POST = async (req) => {
    try {
        const { announcement_title, description, tags = [], created_by } = await req.json();

        if (!announcement_title) {
            return new Response(
                JSON.stringify({ message: "Title is a required field" }),
                { status: 422 }
            );
        }
        // Connect to the database
        await connectToDB();

        // Create a new announcement
        const announcement = new announcments({
            announcement_title,
            description,
            tags,
            created_by,
        });

        const newAnnouncement = await announcement.save();

        // Return the newly created financial record
        return new Response(JSON.stringify("New Announcement Added"), {
            status: 201,
        });


    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message, message: "Error adding announcement" }),
            { status: 500 }
        );
    }
}