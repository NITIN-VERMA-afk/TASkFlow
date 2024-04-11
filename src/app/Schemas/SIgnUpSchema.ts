import {z} from "zod"

export const userNameValidation =z.string()
.min(2,"username at least be 2 character")
.max(10,"username must be 10 character Long" )
.regex(/ ^[a-zA-Z0-9]+$/,"username must not contain special character")


export const SignUpSchema=z.object({
    username:userNameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"password must be at least 6 character"})

})
