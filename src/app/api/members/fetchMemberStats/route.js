import { connectToDB } from "../../../../utils/database";
import members from "../../../models/members";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const counts = await members.aggregate([
      {
        $group: {
          _id: { year: "$year", gender: "$gender" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.year",
          countsByGender: {
            $push: {
              label: "$_id.gender",
              count: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $project: {
          year: "$_id",
          countsByGender: 1,
          total: 1,
          _id: 0,
        },
      },
      { $sort: { year: 1 } }, // Sort by year in ascending order
    ]);

    if (!counts) {
      return new Response(
        JSON.stringify({ message: "No member data available" }, { status: 404 })
      );
    }

    const data = counts.map((item) => ({
      year: item.year,
      stats: [
        ...item.countsByGender,
        { label: "Total Members", count: item.total },
      ],
    }));

    // Transformation function
    const transformData = (data) => {
      const maleCounts = [];
      const femaleCounts = [];
      const otherCounts = []; // Assuming no "Others" category in the input, this will be filled with zeros
      const totalCounts = [];

      data.forEach((item) => {
        item.stats.forEach((stat) => {
          switch (stat.label) {
            case "Male":
              maleCounts.push(stat.count);
              break;
            case "Female":
              femaleCounts.push(stat.count);
              break;
            case "Others":
              otherCounts.push(stat.count);
              break;
            case "Total Members":
              totalCounts.push(stat.count);
              break;
          }
        });
      });

      // Fill `otherCounts` with zeros if "Others" category is missing
      while (otherCounts.length < data.length) {
        otherCounts.push(0);
      }

      return [
        { label: "Male Count", data: maleCounts },
        { label: "Female Count", data: femaleCounts },
        { label: "Others", data: otherCounts },
        { label: "Total Members", data: totalCounts },
      ];
    };

    // Run transformation and log output
    const transformedData = transformData(data);
    return new Response(JSON.stringify(transformedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error: ", error);
    return new Response(
      JSON.stringify(
        { message: "Error while fetching member stats" },
        { status: 500 }
      )
    );
  }
};
