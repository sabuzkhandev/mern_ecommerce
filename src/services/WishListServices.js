const WishModel = require('../models/WishModel')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId

const WishListService = async (req) => {
  // debugger
  try {
    let user_id = new ObjectID(req.headers.user_id)
    let matchStage = { $match: { userId: user_id } }

    let JoinStageProduct = {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    }
    let unwindProductStage = { $unwind: '$product' }

    let JoinStageBrand = {
      $lookup: {
        from: 'brands',
        localField: 'product.brandID',
        foreignField: '_id',
        as: 'brand',
      },
    }
    let unwindBrandStage = { $unwind: '$brand' }

    let JoinStageCategory = {
      $lookup: {
        from: 'categories',
        localField: 'product.categoryID',
        foreignField: '_id',
        as: 'category',
      },
    }
    let unwindCategoryStage = { $unwind: '$category' }

    let data = await WishModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
    ])

    return { status: 'success', data: data }
  } catch (e) {
    return { status: 'fail', message: 'Something Went Wrong !' }
  }
}

const CreateWishListServices = async (req) => {
  try {
    let user_id = req.headers.user_id
    let reqBody = req.body

    reqBody.userId = user_id

    await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true })

    return { status: 'Success', message: 'WishList Created' }
  } catch (e) {
    return { status: 'fail', message: 'Something Went Wrong' }
  }
}

const RemoveWishListServices = async (req) => {
  try {
    let user_id = req.headers.user_id
    let reqBody = req.body

    reqBody.userId = user_id

    await WishModel.deleteOne(reqBody)

    return { status: 'Success', message: 'WishList Deleted' }
  } catch (e) {
    return { status: 'fail', message: 'Something Went Wrong' }
  }
}

module.exports = {
  WishListService,
  CreateWishListServices,
  RemoveWishListServices,
}
