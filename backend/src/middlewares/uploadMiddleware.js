import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createStorage = (basePath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.reviewId || req.params.lotId;
      if (!id) {
        return cb(new Error('ID is required'), null);
      }

      const dir = path.join(basePath, id);

      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`Directory created: ${dir}`);
        }
        cb(null, dir); 
      } catch (error) {
        console.error(`Error creating directory: ${dir}`, error);
        cb(error, null);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
};

const reviewStorage = createStorage('uploads/reviews');

const lotStorage = createStorage('uploads/lots');

export const uploadSingleReview = multer({ storage: reviewStorage }).single('photo');

export const uploadMultipleReviews = multer({ storage: reviewStorage }).array('photos');

export const uploadMultipleLots = multer({ storage: lotStorage }).array('photos');