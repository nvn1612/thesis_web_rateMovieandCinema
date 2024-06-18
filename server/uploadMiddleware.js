const multer = require('multer');
const path = require('path');

const storage = (uploadType) => multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploadimage';
    if (uploadType === 'movie') {
      uploadPath = 'uploadimage/uploadimagemovie';
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File type not supported'), false);
  }
};

const uploadUserImage = multer({
  storage: storage('user'),
  fileFilter: fileFilter,
}).single('avatar');

const uploadMovieImage = multer({
  storage: storage('movie'),
  fileFilter: fileFilter,
}).fields([{ name: 'poster_image', maxCount: 1 }, { name: 'backdrop_image', maxCount: 1 }]);

module.exports = { uploadUserImage, uploadMovieImage };
