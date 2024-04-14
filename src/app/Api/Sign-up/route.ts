import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModels";

import bcrypt from "bcryptjs";

export async function POST(request: Response) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVarified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          Message: "Username already exist",
        },
        { status: 400 }
      );
    }

    const existedUserByEmail = await UserModel.findOne({
      email,
    });
    const verifyCode=Math.floor(1000+Math.random()*900000).toString();
    if (existedUserByEmail) {
        if(existedUserByEmail.isVarified){
          return  Response.json({
              sucess:false,
              message:"User already exist with this email"
          },{status:400})
        }else{
          const hasedPassword=await bcrypt.hash(password,10)
          existedUserByEmail.password=hasedPassword;
          existedUserByEmail.verifyCode=verifyCode
          existedUserByEmail.verifiedCodeexpiry= new Date(Date.now()+3600000)
          await existedUserByEmail?.save()
        }
      } else {
        const hasedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
  
        const newUser = new UserModel({
          username,
          email,
          password: hasedPassword,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          isVerified: false,
          isAcceptingMessage: true,
          message: [],
        });
        await newUser.save();
  
        const emailResponse = await sendVerificationEmail(
          email,
          username,
          verifyCode
        );
        if (!emailResponse.success) {
          return Response.json(
            {
              success: false,
              message: emailResponse.message,
            },
            { status: 500 }
          );
        }
      }
      return Response.json(
          {
            success: true,
            message: "user registered successfully. please verify your email",
          },
          { status: 201 }
        );

  } catch (error) {
    return Response.json({
        success:false,
        message:"Error registring user",

    },{
        status:500,
    })
  }
}
