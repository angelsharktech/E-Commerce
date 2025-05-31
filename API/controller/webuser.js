
import bcrypt from "bcrypt";
import webuser from "../model/webuser.js";

export const registeruser = async(req,res,next) =>{
try {
    const User = await webuser.findOne({email : req.body.email})
    if(User){
        return  res.status(200).json({ msg: "User Already Exist" });
    }else{
    const password = bcrypt.hashSync(req.body.password , 3)
    const Data = new webuser({
        ...req.body,
        password: password
    })    

    const result = await Data.save()
    if (!result) {
        res.status(200).json({ msg: "User Not Created" });
      }else{
        res.status(200).json({ msg: "User Created Successfully" });
      }
    }
} catch (error) {
    console.log(error);    
}
}

export const login =async(req,res,next) =>{
    try {
        const User = await webuser.findOne({email : req.body.email})
        if(!User){
            return res.status(200).json({msg:'user does not exist'})
        }else{
           
            const result = bcrypt.compareSync(req.body.password.trim(), User.password.trim())
            
            if (result === false) return res.status(200).json({ msg: 'Invalid Credential' })
                const { password, ...restOfDetails } = User._doc;
                  res.status(200).json({ msg: "Login Successfully", details: restOfDetails });    
        }
    } catch (error) {
        console.log(error);
        
    }
}

