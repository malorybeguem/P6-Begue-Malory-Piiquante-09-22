//requires//
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//TELL MULTER TO REGISTER FILES IN IMAGE FOLDER//
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //TELL MULTER HOW TO RENAME FILES//
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
//EXPORT MULTER// WE TELL HIM WE ONLY MANAGE UPLOADING OF IMAGES FILES //
module.exports = multer({storage: storage}).single('image');