import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import csvParser from "csv-parser";
import members from "../../../../../models/members";
import { connectToDB } from "../../../../../utils/database";

const pump = promisify(pipeline);

export async function POST(req, res) {
  try {
    // Define the directory path
    const uploadDir = path.join(process.cwd(), "public", "file");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log(`Directory created: ${uploadDir}`);
    }

    const formData = await req.formData();
    const file = formData.getAll("files")[0];

    // Check if a file is present
    if (!file) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "No files uploaded. Please check your request.",
        }),
        { status: 400 }
      );
    }

    const filePath = `./public/file/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));

    await connectToDB();

    // Read and parse the CSV file
    const membersData = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Push each row to the membersData array
        membersData.push({
          name: row.name,
          std_id: row.std_id,
          programme: row.programme,
          year: row.year,
          contact_number: row.contact_number,
          email: row.email,
          department: row.department,
          gender: row.gender,
          designation: row.designation,
        });
      })
      .on("end", async () => {
        // Save parsed data to MongoDB
        try {
          await members.insertMany(membersData);
          return NextResponse.json({
            status: "success",
            message: `${membersData.length} records added.`,
          });
        } catch (err) {
          console.error("MongoDB insert error:", err);
          return new Response(
            JSON.stringify({
              status: "fail",
              message: "Failed to save data to MongoDB.",
            }),
            { status: 500 }
          );
        }
      })
      .on("error", (error) => {
        console.error("CSV parsing error:", error);
        return new Response(
          JSON.stringify({
            status: "fail",
            message: "An error occurred while parsing the CSV.",
          }),
          { status: 500 }
        );
      });

    // Return a response to indicate processing is happening
    return new Response(
      JSON.stringify({
        status: "processing",
        message: "File uploaded, processing...",
      }),
      { status: 202 }
    );
  } catch (e) {
    console.error("File upload error:", e);
    return new Response(
      JSON.stringify({
        status: "fail",
        message: e.message || "An error occurred",
      }),
      { status: 500 }
    );
  }
}
