
import mongoose, { Schema, Document } from "mongoose";


export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifiedCodeexpiry: Date;
  isVarified: boolean;
}

const UserSChema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "please enter your username"],
    trim: true,
    unique: true,
  },
  email:{
    type:String,
    required:[true,"please enter your email"],
    trim:true,
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,"please use a valid email address"]


  },
  password:{
    type:String,
    required:[true,"password is required"],
  },
  verifyCode:{
    type:String,
    required:[true,"verify code is require"]

  },
  verifiedCodeexpiry:{
    type:Date,
    require:[true,"expiryCodeis required"]
  },
  isVarified:{
    type:Boolean,
    default:false
  }

});

const userModel=(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSChema)

export default userModel;
