const user = require("../model/user");
const VerificationToken = require("../model/verificationToken");
const { sendError } = require("../utils/helper");

const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate } = require("../utils/mail");


exports.createUser = async (req,res) => {
    const {name, email, password} = req.body;

    const User = await user.findOne({ email});
    if(User)
    return sendError(res, "This email is already exists !!")
    
    const newUser = new user({
        name,
        email,
        password,
    })

    const otp = generateOTP();
    const verificationToken = new VerificationToken({
        owner : newUser._id,
        token : otp
    })    

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
        from : "emailverification@email.com",
        to : newUser.email,
        subject : "Verify your email account",
        html : generateEmailTemplate(otp),
    })

    res.status(201).json({ message: "User created successfully" });
}

exports.signin = async (req, res) =>{
    const {email, password} = req.body
    if(!req.body || !email.trim() || !password.trim()) return sendError(res, "Email/Password is missing")
    
    const User = await user.findOne({email})
    if(!User) return sendError(res, 'User not found')
    
    const isMatched = await User.comparePassword(password)
    if(!isMatched) return sendError(res, "email/password does not match !")
  
    jwt.sign({userId : User._id}, process.env.JWT_SECRET,{
        expiresIn : '1d'
    })
    res.json({success:true, User : {
        name : User.name, email: User.email, id:User._id 
    },})

}