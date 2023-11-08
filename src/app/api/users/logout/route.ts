import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout Succesful",
      status: 201,
    });

    response.cookies.set("token", "", { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error);
  }
};
