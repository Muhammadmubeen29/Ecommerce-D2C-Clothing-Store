import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');

    if (user) {
      res.json({
        success: true,
        data: user.cart,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    // Validation
    if (!productId || !quantity || !size) {
      return res.status(400).json({ message: 'Please provide product, quantity, and size' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.user._id);

    // Check if item already exists in cart with same size
    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        product: productId,
        quantity,
        size,
      });
    }

    await user.save();
    await user.populate('cart.product');

    res.json({
      success: true,
      data: user.cart,
      message: 'Item added to cart',
    });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ message: 'Server error adding to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const user = await User.findById(req.user._id);
    const cartItem = user.cart.id(itemId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Check stock
    const product = await Product.findById(cartItem.product);
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    cartItem.quantity = quantity;
    await user.save();
    await user.populate('cart.product');

    res.json({
      success: true,
      data: user.cart,
      message: 'Cart updated',
    });
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({ message: 'Server error updating cart' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);

    await user.save();
    await user.populate('cart.product');

    res.json({
      success: true,
      data: user.cart,
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ message: 'Server error removing from cart' });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ message: 'Server error clearing cart' });
  }
};




