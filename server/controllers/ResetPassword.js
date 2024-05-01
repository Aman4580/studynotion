const User = require('../models/User');
const mailsender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

exports.resetPasswordToken = async (req,res) =>{

try {
  //get email from body
const email = req.body.email;

const user = await User.findOne({email:email});
if(!user){
    return res.json({
        success:false,
        message:"Your email is not registered"
    })
}

// token generate

const token = crypto.randomUUID();

const updatedDetails = await User.findOneAndUpdate(
                                                {email:email},
                                                {
                                                  token:token,
                                                  resetPasswordExpires:Date.now() + 5*60*100  
                                                },
                                                {new:true}
);
//url create 
const url = `http://localhost:3000/update-password/${token}`
console.log(email);
console.log("token is for reset password",token);
await mailsender(email,
                  "password reset link",
                  `password reset link ${url}`
                   );
        return res.json({
          success:true,
          message:"Email send successfully . ple check email and change password"
        })
} catch (error) {
  console.error(error);
  return res.json({
    success:false,
    message:"something went wrong , while password reset"
  })
}
     }


     //reset password

     exports.resetPassword = async (req,res) =>{
      try {
        const {password,confirmPassword,token} = req.body;
        if(password!==confirmPassword){
         return res.json({
           success:false,
           message:"Password did not Match"
         })
        }
        const userdetails = await User.findOne({token:token});
        if(!userdetails){
         return res.json({
           success:false,
           message:"token invalid"
         })
        }
 
        if(userdetails.resetPasswordExpires<Date.now()){
         return res.json({
           success:false,
           message:"Token Expires"
         })
        }
 
        const hashedPassword = await bcrypt.hash(password,10);
 
        // update
        await User.findOneAndUpdate(
                                   {token:token},
                                   {password:hashedPassword},
                                   {new:true}
                                   )
             return res.status(200).json({
               success:true,
               message:"password reset successfully"
             })  
      } catch (error) {
        return res.status(500).json({
          success:false,
          message:"some thing went wrong when going password reset"
        })  
      }                    
           }