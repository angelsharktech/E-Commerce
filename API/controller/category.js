import category from "../model/category.js";

export const addCategory = async(req,res,next) =>{
    try {
        // console.log(req.body);
        
        const categoryCheck = await category.findOne({categoryName : req.body.categoryName})
        // console.log(categoryCheck);
         
        if(categoryCheck){
            res.status(200).json({msg:'Category Already Exist'})
        }else{
            const result = await new category(req.body).save() 
        res.status(200).json({msg:'Category Added'})
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const getCategory = async(req,res,next) => { 
    try {
        const result = await category.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        
    }
}

export const updateCategory = async(req,res,next) =>{
try {
  const result = await category.findByIdAndUpdate({_id:req.params.id}, req.body , {new:true})
  res.status(200).json({msg:"Category Updated successfully..."})
  
} catch (error) {
  console.log(error);
  
}
}
export const deleteCategory = async(req,res,next) =>{
try {
  const result = await category.findByIdAndDelete({_id:req.params.id}, req.body )
  res.status(200).json({msg:"Category Deleted successfully..."})
  
} catch (error) {
  console.log(error);
  
}
}

