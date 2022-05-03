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
module.exports.login=async (req,res,next)=>{
try{const {username,password} = req.body;
const user=await User.findOne({username});
if (!user)
return res.json({msg:"User Does not exist",status:false});  


const isPasswordsValid =await bcrypt.compare(password,user.password);
if (!isPasswordsValid)
return res.json({msg:"password is incorrect",status:false});


delete user.password;
res.json({msg:"user logged in successfully",status:true,user});}
catch(err){
    next(err);
}

}
module.exports.setAvatar=async (req,res,next)=>{
    try {
        const userId=req.params.id; 
        const avatarImage=req.body.image;
        const userData=await User.findByIdAndUpdate(userId,{isAvatarImageSet:true,avatarImage:avatarImage});
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
    }
    catch(ex){
        console.log(ex);
        next(ex);
    }
}