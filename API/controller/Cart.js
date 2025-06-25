import cart from "../model/cart.js";
import prod from "../model/product.js";

export const addToCart = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.params.wid);
    const product = {
      _id: req.body._id,
      title: req.body.title,
      price: req.body.selling_price,
    };

      let userCart = await cart.findOne({ webuser: req.params.wid });
    if (userCart) {
      // Check if product already in cart
      const existingProduct = userCart.cart.find((p) => p._id === product._id);
    
     if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.price = existingProduct.price + product.price
      }else {
        // Push new product with quantity 1
        userCart.cart.push({ ...product, quantity: 1 });
      }

      await userCart.save();
      return res.status(200).json({ message: 'Product updated in cart' });
    }else {
      // If user has no cart yet, create one
      const newCart = new cart({
        webuser: req.params.wid,
        cart: [{ ...product, quantity: 1 }],
      });

      await newCart.save();
      return res.status(201).json({ message: 'New cart created with product' });
    }
  } catch (error) {
    next(error);
  }
};

export const getCartItemCount = async (req, res, next) => {
  try {
    // console.log('wid::',req.params.wid);
    
    const userId = req.params.wid;
    const userCart = await cart.findOne({ webuser: userId });

    if (!userCart) return res.json({ count: 0 });

    // Total count: sum of quantities
    const totalCount = userCart.cart.length;

    // const totalCount = userCart.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    res.status(200).json({ count: totalCount });
  } catch (error) {
    next(error);
  }
};

export const getCartItem = async(req,res,next) =>{
  try {
    console.log('cart item:',req.params.wid);
    
    const result = await cart.findOne({webuser : req.params.wid}) 
    res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}
export const UpdateCart = async(req,res,next) =>{
  try {
    console.log('cart item:',req.params.wid);
    console.log('cart:',req.body);
    const product = await prod.findOne({_id: req.body._id})
    // console.log(product);
    
    const result = await cart.findOneAndUpdate({webuser: req.params.wid, 'cart._id': req.body._id  },
       { $set: { 'cart.$.quantity' : req.body.quantity ,'cart.$.price':(product.selling_price * req.body.quantity) } },
      { new: true }) 
    res.status(200).json(result)

  } catch (error) {
    next(error)
  }
}
export const deleteCart =async(req,res,next) =>{
  try {
     const result = await cart.findByIdAndDelete({_id:req.params.id}, req.body )     
     res.status(200).json({msg:'Cart is empty'})
  } catch (error) {
    console.log(error)
  }
}
export const deleteCartItem = async (req, res) => {
  const { userId, cartId } = req.params;
  try {
    const updatedCart = await cart.findOneAndUpdate(
      { webuser: userId },
      {
        $pull: {
          cart: { _id: cartId }
        }
      },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found for user" });
    }

    res.status(200).json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Server error while removing item" });
  }
};