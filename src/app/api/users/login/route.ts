import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists" },
        { status: 400 }
      );
    }

    //Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    //JWT

    //CreateTokenData
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //CreateToken
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const respone = NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

    respone.cookies.set("token", token, { httpOnly: true });

    return respone;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// const GET = async(response : NextResponse) => {}
