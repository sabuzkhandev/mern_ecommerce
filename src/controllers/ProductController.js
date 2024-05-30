const {
  BrandListServices,
  CategoryListServices,
  SliderListServices,
  ProductListByBrandServices,
  ProductListByCategoryServices,
  ProductListBySimilarServices,
  ProductListByKeywordServices,
  ProductListByRemarkServices,
  ProductDetailsServices,
  ProductReviewListServices,
} = require('../services/ProductServices')

exports.ProductBrandList = async (req, res) => {
  let result = await BrandListServices()
  return res.status(200).json(result)
}

exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryListServices()
  return res.status(200).json(result)
}

exports.ProductSliderList = async (req, res) => {
  let result = await SliderListServices()
  return res.status(200).json(result)
}

exports.ProductListByBrand = async (req, res) => {
  let result = await ProductListByBrandServices(req)
  return res.status(200).json(result)
}

exports.ProductListByCategory = async (req, res) => {
  let result = await ProductListByCategoryServices(req)
  return res.status(200).json(result)
}

exports.ProductListBySimilar = async (req, res) => {
  let result = await ProductListBySimilarServices(req)
  return res.status(200).json(result)
}

exports.ProductListByKeyword = async (req, res) => {
  let result = await ProductListByKeywordServices(req)
  return res.status(200).json(result)
}

exports.ProductListByRemark = async (req, res) => {
  let result = await ProductListByRemarkServices(req)
  return res.status(200).json(result)
}

exports.ProductDetails = async (req, res) => {
  let result = await ProductDetailsServices(req)
  return res.status(200).json(result)
}

exports.ProductReviewList = async (req, res) => {
  let result = await ProductReviewListServices(req)
  return res.status(200).json(result)
}
