import category from "../model/category.js";


// export const addCategory = async (req, res) => {
//   try {
//     const { mainCategory, subCategories, categoryBy } = req.body;

//     // Validate inputs
//     if (!mainCategory || !Array.isArray(subCategories) || subCategories.length === 0 || !categoryBy) {
//       return res.status(200).json({ msg: 'All fields are required (mainCategory, subCategories)' });
//     }

//     const existing = await category.findOne({ mainCategory, categoryBy });
//     if (existing) {
//       return res.status(200).json({ msg: 'Main Category already exists for this shop' });
//     }

//     const newCategory = new category({
//       mainCategory,
//       subCategories,
//       categoryBy,
//     });

//     await newCategory.save();

//     return res.status(201).json({ msg: 'Category Added', category: newCategory });

//   } catch (error) {
//     console.error('Error adding category:', error);
//     res.status(500).json({ msg: 'Server error while adding category' });
//   }
// };

export const addCategory = async(req,res,next) =>{
    try {
        // console.log(req.body);
        
        const categoryCheck = await category.findOne({categoryName : req.body.categoryName , categoryBy : req.body.categoryBy})
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

// export const updateCategory = async(req,res,next) =>{
// try {
//    const { mainCategory, subCategories } = req.body;

//  const updatedCategory = await category.findByIdAndUpdate(
//       {_id : req.params.id},
//       {
//         mainCategory,
//         subCategories
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedCategory) {
//       return res.status(404).json({ msg: 'Category not found' });
//     }

//     return res.status(200).json({ msg: 'Category Updated Successfully', category: updatedCategory });

  
// } catch (error) {
//   console.log(error);
// }
// }

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

export const getCategoryByShop = async(req,res,next) =>{
  try {
    const result = await category.find({categoryBy: req.params.shop})
    res.status(200).json({result , count:result.length})  
  } catch (error) {
    console.log(error);
    
  }
}
export const getCategoryByMainCategory = async(req,res,next) =>{
  try {
    const result = await category.find({mainCategory: req.params.mainCategory})
    res.status(200).json({result })  
  } catch (error) {
    console.log(error);
    
  }
}