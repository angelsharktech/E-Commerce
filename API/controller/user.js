import user from "../model/user.js";
import bcrypt from "bcrypt";

export const registeruser = async(req,res,next) =>{
try {
    const User = await user.findOne({username : req.body.username})
    if(User){
        return  res.status(200).json({ msg: "User Already Exist" });
    }else{
    const password = bcrypt.hashSync(req.body.password , 3)
    const Data = new user({
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
        const User = await user.findOne({username : req.body.username})
        if(!User){
            return res.status(200).json({msg:'user does not exist'})
        }else{
           
            const result = bcrypt.compareSync(req.body.password.trim(), User.password.trim())
            
            if (result === false) return res.status(200).json({ msg: 'Invalid Credential' })
                const { password, ...restOfDetails } = User._doc;
                  res.status(200).json({ msg: "Login Successfully", details: restOfDetails });    
        }
    } catch (error) {
        next(error);
        
    }
}

export const getUserById = async(req,res,next) =>{
try {
   const result = await user.findById({_id : req.params.id})   
    res.status(200).json(result)
} catch (error) {
    next(error)
}
}
export const updateUser = async(req,res,next) =>{
try {
    const result = await user.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    
    res.status(200).json({msg : 'Data Updated Successfully...',data:result})
} catch (error) {
    next(error)
}
}