import product from "../model/product.js";

export const addProduct = async (req, res, next) => {
  try {
    const singleFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    if (!singleFile) {
      return res.status(400).json({ msg: 'Thumbnail image is required' });
    }

    const multipleFiles = req.files["images"] || [];
    const baseUrl = process.env.API_URL || 'https://api.toyshop.sbs';
    
    const images = [];
    multipleFiles.forEach((image) => {
      images.push(`${baseUrl}/api/gallery/${image.filename}`);
    });

    const obj = {
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      productBy: req.body.productBy,
      actual_price: req.body.actual_price,
      selling_price: req.body.selling_price,
      avail_qty: req.body.avail_qty,
      thumbnail: `${baseUrl}/api/gallery/${singleFile.filename}`,
      images: images,
    };

    // Validate required fields
    if (!obj.title || !obj.category || !obj.actual_price || !obj.selling_price) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const newProduct = new product(obj);
    const result = await newProduct.save({ w: 'majority', j: true, wtimeout: 5000 });
    
    if (result) {
      console.log('Product saved successfully:', result._id);
      res.status(200).json({ msg: 'Product Added', productId: result._id });
    }

  } catch (error) {
    console.error('Error adding product:', error);
    next(error);
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
export const getProductByName = async(req,res,next) =>{
  try {
    // const encodedCategory = encodeURIComponent(req.params.name);
    // console.log(encodedCategory);
    
    const result = await product.find({title :req.params.name})
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
export const getProductByCategory = async(req,res,next) =>{
  try {
    const result = await product.find({category: req.params.name})
    res.status(200).json(result)
    
    
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