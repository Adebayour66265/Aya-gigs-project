import express from 'express'
import {
  checkout,
  removeFromCart,
  addToCart,
  getCart,
} from '../controller/CartPurchase.js'
import isLoggedIn from '../middleware/auth/isLoggedIn.js'
import CartPurchase from '../model/CartPurchase.js'

const cartPurchaseRoutes = express.Router()

// Get user's cart
cartPurchaseRoutes.get('/cart', isLoggedIn, getCart)

// Add course to cart
cartPurchaseRoutes.post('/cart/add', isLoggedIn, addToCart)

// Remove course from cart
cartPurchaseRoutes.post('/cart/remove', isLoggedIn, removeFromCart)

// Get user's purchases
cartPurchaseRoutes.get('/purchases', isLoggedIn, checkout)

// ===========OR TRY THIS BELOW DURING TESTING OF ROUTES ==========

// Purchase courses in cart
cartPurchaseRoutes.post('/purchase', isLoggedIn, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('courses')
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    const purchase = new CartPurchase({
      user: req.user.id,
      courses: cart.courses,
    })
    await purchase.save()
    await CartPurchase.deleteOne({ user: req.user.id })
    res.json(purchase)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Server error' })
  }
})

export default cartPurchaseRoutes

// =============Add course to cart second try=============

// async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       const newCart = new Cart({
//         user: req.user.id,
//         courses: [req.body.courseId]
//       });
//       await newCart.save();
//       return res.json(newCart);
//     }
//     cart.courses.addToSet(req.body.courseId);
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// }

// ================Remove course from cart second try==================

// async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ error: 'Cart not found' });
//     }
//     cart.courses.pull(req.body.courseId);
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// }
