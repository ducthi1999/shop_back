const ProductModel = require('../../models/product')
const uploadImage = require('../../utils/uploadImage')
const removeImage = require('../../utils/removeImage')

const update = (req, res, next) => {
  const slug = req.params.slug
  const data = req.body
  const { image, newImage } = data

  if (newImage) {
    removeImage(image.publicId, {}, (error, result) => {
      if (error) {
        console.log('Lỗi xóa ảnh!')
      }
      if (result) {
        console.log(result)
      }
    })

    uploadImage(newImage, {}, (error, result) => {
      if (error) {
        req.err = 'Lỗi upload ảnh'
        return next('last')
      }

      if (result && result.url) {
        data.image = {
          url: result.url,
          publicId: result.public_id || result.public_ids
        }

        ProductModel.updateOne({
          slug
        }, data)
          .then(resData => {
            if (resData) {
              res.json({
                status: true,
                message: 'Cập nhật thành công!'
              })
            } else {
              req.err = 'Lỗi cập nhật!'
              return next('last')
            }
          })
          .catch(err => {
            next('last')
          })
      } else {
        req.err = 'Lỗi cập nhật!'
        return next('last')
      }
    })

  } else {
    ProductModel.updateOne({
      slug
    }, data)
      .then(resData => {
        if (resData) {
          res.json({
            status: true,
            message: 'Cập nhật thành công!'
          })
        } else {
          req.err = 'Lỗi cập nhật!'
          return next('last')
        }
      })
      .catch(err => {
        next('last')
      })
  }
}

module.exports = update