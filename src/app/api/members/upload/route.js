import members from "../../../../models/members";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req, res) => {
  const {
    name,
    std_id,
    programme,
    year,
    contact_number,
    email,
    department,
    gender,
    designation,
  } = await req.json();

  if (
    !name ||
    !std_id ||
    !programme ||
    !year ||
    !contact_number ||
    !email ||
    !department ||
    !gender ||
    !designation
  ) {
    return new Response(
      JSON.stringify({ message: "Missing Required Fields" }, { status: 422 })
    );
  }

  //Connect to db
  await connectToDB();

  //Check if member already exists
  const existingMember = await members.findOne({ email: email });
  console.log(existingMember);
  if (existingMember) {
    return new Response(
      JSON.stringify({ message: "Member already exists" }, { status: 409 })
    );
  }

  const newMember = new members({
    name: name,
    std_id: std_id,
    programme: programme,
    year: year,
    contact_number: contact_number,
    email: email,
    department: department,
    gender: gender,
    designation: designation,
  });

  try {
    await newMember.save();
    return new Response(
      JSON.stringify(
        { message: newMember },
        { status: 201 },
        { headers: { "Content-Type": "application/json" } }
      )
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error uploading member" }, { status: 500 })
    );
  }
};
