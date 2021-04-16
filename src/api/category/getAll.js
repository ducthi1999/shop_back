const CategoryModel = require('../../models/category')

const getAll = (req, res, next) => {
  CategoryModel.find({})
    .then(resData => {
      if (resData && resData.length > 0) {
        console.log(resData)
        res.json({
          status: true,
          message: 'Lấy chuyên mục thành công!',
          categories: resData
        })
      }
    })
}

module.exports = getAll