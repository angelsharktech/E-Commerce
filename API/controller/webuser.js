import bcrypt from "bcrypt";
import webuser from "../model/webuser.js";

export const registeruser = async (req, res, next) => {
  try {
    const User = await webuser.findOne({ email: req.body.email });
    if (User) {
      return res.status(200).json({ msg: "User Already Exist" });
    } else {
      const password = bcrypt.hashSync(req.body.password, 3);
      const Data = new webuser({
        ...req.body,
        password: password,
      });

      const result = await Data.save();
      if (!result) {
        res.status(200).json({ msg: "User Not Created" });
      } else {
        res.status(200).json({ msg: "User Created Successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
// export const login =async(req,res,next) =>{
//     try {
//         const User = await webuser.findOne({email : req.body.email})
//         if(!User){
//             return res.status(200).json({msg:'user does not exist'})
//         }else{

//             const result = bcrypt.compareSync(req.body.password.trim(), User.password.trim())

//             if (result === false) return res.status(200).json({ msg: 'Invalid Credential' })
//                 const { password, ...restOfDetails } = User._doc;
//                   res.status(200).json({ msg: "Login Successfully", details: restOfDetails });
//         }
//     } catch (error) {
//         console.log(error);

//     }
// }

export const signup = async (req, res, next) => {
  try {
    // console.log("signup::", req.body);
    const { phone } = req.body;
    const User = await webuser.findOne({ mob_no: phone });
    if (!User) {
      const newUser = new webuser({
        mob_no: phone, // explicitly set mob_no
      });
      const result = await newUser.save();
      console.log("New user created:", result);  
      res.status(200).json({ msg: "Login Successfully", details: result });
    } else {
      res.status(200).json({ msg: "Login Successfully", details: User });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateWebUser = async (req, res, next) => {
  try {
    console.log("updateWebUser::", req.body);
    
    const { mob_no, ...restFields } = req.body;
    const updatedUser = await webuser.findOneAndUpdate(
      { mob_no: mob_no },
      { $set: restFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "User Not Found" });
    }else{
      res.status(200).json({ msg: "User Updated Successfully", details: updatedUser });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWebUserById = async (req, res, next) => {
  try {
    const result = await webuser.findById({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}


export const signOut = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};
