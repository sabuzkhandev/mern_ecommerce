const {
  WishListService,
  CreateWishListServices,
  RemoveWishListServices,
} = require('../services/WishListServices')

exports.WishList = async (req, res) => {
  let result = await WishListService(req)
  return res.status(200).json(result)
}

exports.SaveWishList = async (req, res) => {
  let result = await CreateWishListServices(req)
  return res.status(200).json(result)
}

exports.RemoveWishList = async (req, res) => {
  let result = await RemoveWishListServices(req)
  return res.status(200).json(result)
}
