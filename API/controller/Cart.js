import cart from "../model/cart.js";

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
    console.log('wid::',req.params.wid);
    
    const userId = req.params.wid;
    const userCart = await cart.findOne({ webuser: userId });

    if (!userCart) return res.json({ count: 0 });

    // Total count: sum of quantities
    const totalCount = userCart.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    res.status(200).json({ count: totalCount });
  } catch (error) {
    next(error);
  }
};