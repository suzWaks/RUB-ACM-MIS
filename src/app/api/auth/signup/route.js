import bcrypt from "bcryptjs";
import users from "../../../../models/users";
import members from "../../../../models/members";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  //Validate the input
  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 422 }
    );
  }

  //Connect to database
  await connectToDB();

  //Check if the user already exists
  const exisitingUser = await users.findOne({ email });
  if (exisitingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  //Check if the user is a member
  const member = await members.findOne({ email });
  if (!member) {
    return new Response(
      JSON.stringify({ message: "Need to be a member to create an account" }),
      { status: 403 }
    );
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  //Create a new user
  const newUser = new users({
    email: email,
    password: hashedPassword,
    role: "member",
    stdID: member.std_id,
  });

  try {
    await newUser.save();

    // Update the member's userID field
    await members.updateOne(
      { _id: member._id }, // Find the member by their _id
      { userID: newUser._id } // Set the userID field to the new user's ObjectId
    );

    return new Response(
      JSON.stringify({ message: "User created successfully" }, { status: 201 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error when creating user" }, { status: 500 })
    );
  }
};
