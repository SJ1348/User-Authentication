import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findOne({ _id: id }).select(
      "-password -isVerified"
    );
    return NextResponse.json({
      message: "User Found",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
};
