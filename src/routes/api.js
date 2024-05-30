const express = require('express')
const ProductController = require('../controllers/ProductController')
const UserController = require('../controllers/UserController')
const AuthVerification = require('../middlewares/AuthVerification')
const WishListController = require('../controllers/WishListController')
const CartListController = require('../controllers/CartListController')

const router = express.Router()

//product all router
router.get('/ProductBrandList', ProductController.ProductBrandList)
router.get('/ProductCategoryList', ProductController.ProductCategoryList)
router.get('/ProductSliderList', ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandId', ProductController.ProductListByBrand)
router.get(
  '/ProductListByCategory/:CategoryId',
  ProductController.ProductListByCategory
)
router.get(
  '/ProductListBySimilar/:CategoryId',
  ProductController.ProductListBySimilar
)
router.get(
  '/ProductListByKeyword/:Keyword',
  ProductController.ProductListByKeyword
)
router.get(
  '/ProductListByRemark/:Remark',
  ProductController.ProductListByRemark
)
router.get('/ProductDetails/:ProductId', ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductId', ProductController.ProductReviewList)

//user all route
router.get('/UserOTP/:email', UserController.UserOTP)
router.get('/VerifyLogin/:email/:otp', UserController.VerifyLogin)
router.get('/UserLogout', AuthVerification, UserController.UserLogout)
router.post('/CreateProfile', AuthVerification, UserController.CreateProfile)
router.post('/UpdateProfile', AuthVerification, UserController.UpdateProfile)
router.get('/ReadProfile', AuthVerification, UserController.ReadProfile)

//wishlist all route
router.get('/WishList', AuthVerification, WishListController.WishList)
router.post(
  '/CreateWishList',
  AuthVerification,
  WishListController.SaveWishList
)
router.get(
  '/RemoveWishList',
  AuthVerification,
  WishListController.RemoveWishList
)

//cartList all route
router.get('/CartList', AuthVerification, CartListController.CartList)
router.post('/SaveCartList', AuthVerification, CartListController.SaveCartList)
router.post(
  '/UpdateCartList/:cartID',
  AuthVerification,
  CartListController.UpdateCartList
)
router.get(
  '/RemoveCartList',
  AuthVerification,
  CartListController.RemoveCartList
)

module.exports = router
