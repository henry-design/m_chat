const User =require('../model/userModel');
const bcrypt=require('bcrypt');
module.exports.register=async (req,res,next)=>{
try{const {username,email,password} = req.body;
const usernameCheck=await User.findOne({username:username});
if (usernameCheck)
return res.json({msg:"username already in use",status:false});  
const emailCheck=await User.findOne({email:email});
if (emailCheck)
return res.json({msg:"email already in use",status:false});
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
const user=await User.create({
    username,email,password:hashedPassword
});

delete user.password;
res.json({msg:"user created successfully",status:true,user});}
catch(err){
    next(err);
}





}