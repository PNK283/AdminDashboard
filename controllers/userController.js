const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils");
var parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/tokenModel");
const crypto = require('crypto');

//Register User
const registerUser = asyncHandler( async(req, res) =>{
   const {name, email, password} = req.body;

   //Validation
   if(!name || !email || !password ) {
    res.status(400)
    throw new Error("Please fill in all the required fields")
   }

   if(password.length < 6 ) {
    res.status(400)
    throw new Error("Password must be up to 6 characters. ")
   }  

   //Check if User already Exists
   const userExists = await User.findOne({ email })

   if(userExists){
    res.status(400)
    throw new Error("Email already in use. ")
   }  
   
   //Get UserAgent
   const ua = parser(req.headers['user-agent']);
   const userAgent = [ua.ua];

   //Create new User
   const user = await User.create({
    name,
    email,
    password,
    userAgent,
   });

   //Generate Token
   const token = generateToken(user._id);

   //sedn HTTP-only cookie
   res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    sameSite: 'none',
    secure: true, 
   });

   
   if(user){
    const {_id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
        _id, 
        name, 
        email, 
        phone, 
        bio, 
        photo, 
        role, 
        isVerified, 
        token,
    });
  }
  else {
      res.status(400)
      throw new Error("Invalid user data");
  }
}); 



//Login User
const loginUser = asyncHandler(async(req, res)=>{

     const { email, password } = req.body;

     //Validation
     if(!email || !password){
         res.status(400);
         throw new Error("Please add email and password");
     }
    
     const user = await User.findOne({ email });

     if(!user){
        res.status(404);
        throw new Error("User not found, please signup");
     }

     const passwordIsCorrect = await bcrypt.compare(password, user.password)

     if(!passwordIsCorrect){
        res.status(404);
        throw new Error("Invalid email and password");
     }

     //Trgger 2FA for unknown UserAgent

     //Generate Token

     const token = generateToken(user._id);

     if(user && passwordIsCorrect){
        //sedn HTTP-only cookie
   res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 Day
    sameSite: 'none',
    secure: true, 
   });

   const {_id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).json({
        _id, 
        name, 
        email, 
        phone, 
        bio, 
        photo, 
        role, 
        isVerified, 
        token,
    });

     }else{
        s.status(500);
        throw new Error("Something went wrong, please try again");
     }
})


//Send Verification Email

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Verification Token and Save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  // Hash Token and save
  const hashedToken = hashToken(verificationToken);

  try {
    const newToken = new Token({
      userId: user._id,
      vToken: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * (60 * 100), // 60mins
    });
    await newToken.save();
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Token not saved, please try again");
  }

  // Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

  // Send Email
  const subject = "Verify Your account - 99Stores";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "kn7151283@gmail.com";
  const template = "verifyEmail";
  const name = user.name;
  const link = verificationUrl;

  try {
    await sendEmail(
      subject, 
      send_to, 
      sent_from, 
      reply_to, 
      template, 
      name, 
      link
      );
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//logout User

const logoutUser = asyncHandler(async(req, res)=>{
    //sedn HTTP-only cookie
   res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 Day
    sameSite: 'none',
    secure: true, 
   });
   return res.status(200).json({ message: "Logout successfull"});
})


const getUser = asyncHandler(async(req, res)=>{
      const user = await User.findById(req.user._id)

      if (user) {
           
   const {_id, name, email, phone, bio, photo, role, isVerified } = user;

   res.status(200).json({
       _id, 
       name, 
       email, 
       phone, 
       bio, 
       photo, 
       role, 
       isVerified, 
   });
      } else {
           res.status(404);
           throw new Error("User not found");
      }
})

//  Update User
const updateUser = asyncHandler (async(req, res)=>{
      const user = await User.findById(req.user._id);

      if (user) {
        const {_id, name, email, phone, bio, photo,
             role, isVerified } = user;

             user.email = email
             user.name = req.body.name || name
             user.phone = req.body.phone || phone
             user.bio = req.body.bio || bio
             user.photo = req.body.photo || photo

             const updateUser = await user.save()

             res.status(200).json({
                _id: updateUser._id, 
                name: updateUser.name, 
                email: updateUser.email, 
                phone: updateUser.phone, 
                bio: updateUser.bio, 
                photo: updateUser.photo, 
                role: updateUser.role, 
                isVerified: updateUser.isVerified, 
            });

      } else {
            res.status(404);
            throw new Error("User not found");
      }

})

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.id);
    
  
    if (!user) {
      res.status(404);
      throw new Error("User not found"); 
    }
  
    await user.deleteOne(user)
    //remove its not an function or method
    //it will directly called
    res.status(200).json({
      message: "User deleted successfully",
    });
  });


  // Get Users
  const getUsers = asyncHandler(async(req, res) =>{
        const users = await User.find().sort("-createdAt").
        select("-password")
        if(!users){
            res.status(500)
            throw new Error("Something went wrong");    
        }
        res.status(200).json(users);
      })

 //Get Login Status
  const loginStatus = asyncHandler(async (req, res)=>{
    const token = req.cookies.token
    if(!token){
        return res.json(false);
    }

     // Verify token
     const verified = jwt.verify(token, process.env.JWT_SECRET);

     if(verified){
        return res.json(true)
     }
     return res.json(false)
  })
 

  //Upgrade User
  const upgradeUser = asyncHandler( async(req, res)=>{
        const { role, id } = req.body

        const user = await User.findById(id)

        if(!user){
            res.status(500)
                throw new Error("User not found");
        }

        user.role = role
        await user.save();

        res.status(200).json({
            message: `User role updated to ${role}`
        });
  });

       // Send Automated emails
const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const user = await User.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});



module.exports = {
    registerUser,
    loginUser, 
    logoutUser,
    getUser,
    updateUser,
    deleteUser,
    getUsers,
    loginStatus,
    upgradeUser,
    sendAutomatedEmail,
    sendVerificationEmail
}