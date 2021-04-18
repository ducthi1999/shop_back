const ProductModel = require('../../models/product')
const uploadImage = require('../../utils/uploadImage')
const toSlug = require('../../utils/toSlug')
const create = (req, res, next) => {
  const data = req.body
  const { userId } = req
  const { image } = data

  ProductModel.findOne({
    slug: toSlug(data.name)
  })
    .then(resData => {
      if (resData) {
        req.err = 'Sản phẩm đã tồn tại!'
        next('last')
      } else {
        if (image && image !== 'null') {
          uploadImage(image, {}, (err, result) => {
            if (err) {
              req.err = 'Lỗi upload ảnh!'
              return next('last')
            }

            if (result && result.url) {
              const newData = {
                ...data,
                seller: userId,
                image: {
                  url: result.url,
                  publicId: result.public_ids || result.public_id
                }
              }

              const newProduct = new ProductModel(newData)
              newProduct.save(err => {
                if (err === null) {
                  res.json({
                    status: true,
                    message: 'Thêm sản phẩm thành công!'
                  })
                } else {
                  req.err = 'Thêm sản phẩm thất bại!'
                  next('last')
                }
              })
            }
          })
        } else {
          const newData = {
            ...data,
            seller: userId,
            image: null
          }

          const newProduct = new ProductModel(newData)
          newProduct.save(err => {
            if (err === null) {
              res.json({
                status: true,
                message: 'Thêm sản phẩm thành công!'
              })
            } else {
              req.err = 'Thêm sản phẩm thất bại!'
              next('last')
            }
          })
        }
      }
    })
}

module.exports = create