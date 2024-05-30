const BrandModel = require('../models/BrandModel')
const CategoryModel = require('../models/CategoryModel')
const ProductSliderModel = require('../models/ProductSliderModel')
const ProductModel = require('../models/ProductModel')
const ProductDetailModel = require('../models/ProductDetailModel')
const ReviewModel = require('../models/ReviewModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const BrandListServices = async () => {
  try {
    let data = await BrandModel.find({})
    return { status: 'Success', data: data }
  } catch (e) {
    return { status: 'Failed', data: e }.toString()
  }
}

const CategoryListServices = async () => {
  try {
    let data = await CategoryModel.find({})
    return { status: 'Success', data: data }
  } catch (e) {
    return { status: 'Failed', data: e }.toString()
  }
}

const SliderListServices = async () => {
  try {
    let data = await ProductSliderModel.find({})
    return { status: 'Success', data: data }
  } catch (e) {
    return { status: 'Failed', data: e }.toString()
  }
}

const ProductListByBrandServices = async (req) => {
  try {
    let BrandId = new ObjectId(req.params.BrandId)
    let MatchStage = { $match: { brandID: BrandId } }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductListByCategoryServices = async (req) => {
  try {
    let CategoryId = new ObjectId(req.params.CategoryId)
    let MatchStage = { $match: { CategoryId: CategoryId } }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductListBySimilarServices = async (req) => {
  try {
    let CategoryId = new ObjectId(req.params.CategoryId)
    let MatchStage = { $match: { CategoryId: CategoryId } }
    let LimitStage = { $limit: 10 }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      MatchStage,
      LimitStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductListByKeywordServices = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: 'i' }
    let SearchParam = [{ title: SearchRegex }, { shortDes: SearchRegex }]
    let SearchStage = { $match: { $or: SearchParam } }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      SearchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductListByRemarkServices = async (req) => {
  try {
    let Remark = req.params.Remark
    let MatchStage = { $match: { remark: Remark } }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductDetailsServices = async (req) => {
  try {
    let ProductId = new ObjectId(req.params.ProductId)
    let MatchStage = { $match: { _id: ProductId } }

    let JoinWithBrandStage = {
      $lookup: {
        from: 'brands',
        localField: 'brandID',
        foreignField: '_id',
        as: 'brands',
      },
    }

    let JoinWithCategoryStage = {
      $lookup: {
        from: 'categories',
        localField: 'categoryID',
        foreignField: '_id',
        as: 'categories',
      },
    }

    let JoinWithDetailsStage = {
      $lookup: {
        from: 'productdetails',
        localField: '_id',
        foreignField: 'productID',
        as: 'details',
      },
    }

    let UnwindBrandStage = { $unwind: '$brands' }
    let UnwindCategoryStage = { $unwind: '$categories' }
    let UnwindDetailsStage = { $unwind: '$details' }

    let ProjectionStage = {
      $project: {
        'brands._id': 0,
        'categories._id': 0,
        brandID: 0,
        categoryID: 0,
      },
    }

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

const ProductReviewListServices = async (req) => {
  try {
    let productId = new ObjectId(req.params.ProductId)
    let MatchStage = { $match: { productID: productId } }

    let JoinWithProfileStage = {
      $lookup: {
        from: 'profiles',
        localField: 'userId',
        foreignField: 'userId',
        as: 'profile',
      },
    }

    let UnwindProfileStage = { $unwind: '$profile' }
    let ProjectionStage = {
      $project: {
        des: 1,
        rating: 1,
        'profile.cus_name': 1,
      },
    }

    let data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      ProjectionStage,
    ])

    return { status: 'Success', data: data }
  } catch (error) {
    return { status: 'Failed', data: error }.toString()
  }
}

module.exports = {
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
}
