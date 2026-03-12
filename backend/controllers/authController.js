const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")


exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success:false,message: "User already exists",data:null });


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ email, password: hashedPassword });

    res.status(201).json({ success:true,message: "User registered", data:{id:user._id,email:user.email} });
  } catch (err) {
  
  res.status(500).json({ success:false,message: err.message ,data:null});
}
};


exports.login = async (req, res) => {
  try {
   
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false,message: "User not found",data:null });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success:false,message: "Invalid credentials",data:null });

    const token=jwt.sign(
      {userId:user._id}, //(data stored inside token)
    process.env.JWT_SECRET,
  {expiresIn:"1h"}    )


     res.status(200).json({
      success:true,
      message:"Login successful",
      data:{
        user:{id:user._id,email:user.email} ,
        token
      }
    });

  } catch (err) {
    res.status(500).json({ success:false,message: err.message,data:null });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.status(200).json({
      success:true,
      message: "Dashboard data",
      data:user
    });

  } catch (error) {
    res.status(500).json({ success:false,message: "Server error",data:null });
  }
};

