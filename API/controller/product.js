import product from "../model/product.js";

export const addProduct = async (req, res, next) => {
  try {
    const singleFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const multipleFiles = req.files["images"] || [];

    const images = [];
    multipleFiles.forEach((image) => {
      images.push("/gallery/" + image.filename);
    });

    const obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      productBy: req.body.productBy,
      actual_price: req.body.actual_price,
      selling_price: req.body.selling_price,
      avail_qty: req.body.avail_qty,
      discount: req.body.discount,
      thumbnail: "/gallery/" + singleFile.filename,
      images: images,
    };

    const result = await new product(obj).save()
    res.status(200).json({msg:'Product Added'})

  } catch (error) {
    console.log(error);
    
  }
};

export const getProduct = async(req,res,next) =>{
    try {
        const result = await product.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        
    }
}

export const getProductById = async(req,res,next) =>{
  try {
    const result = await product.findById({_id : req.params.id})
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    
  }
} 

export const updateProduct = async(req,res,next) =>{
try {
  const result = await product.findByIdAndUpdate({_id:req.params.id}, req.body , {new:true})
  res.status(200).json({msg:"Product Updated successfully..."})
  
} catch (error) {
  console.log(error);
  
}
}
export const deleteProduct = async(req,res,next) =>{
  try {
    const result = await product.findByIdAndDelete({_id:req.params.id}, req.body )
    res.status(200).json({msg:"Product Deleted successfully..."})
    
  } catch (error) {
    console.log(error);
    
  }
}

export const getProductByShop = async(req,res,next) =>{
  try {
    const result = await product.find({productBy: req.params.shop})
    res.status(200).json({result , count:result.length})
    
    
  } catch (error) {
    console.log(error);
    
  }
}
export const getProductByCategory = async(req,res,next) =>{
  try {
    const result = await product.find({category: { $regex: `^${req.params.name}$`, $options: 'i' }})   //IGNORE CASE SENSITIVITY
    res.status(200).json(result)
    
    
  } catch (error) {
    console.log(error);
    
  }
}
export const getProductByName = async(req,res,next) =>{
  try {
        
    const result = await product.find({title :{ $regex: `^${req.params.name}$`, $options: 'i' }})  //IGNORE CASE SENSITIVITY
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    
  }
} 