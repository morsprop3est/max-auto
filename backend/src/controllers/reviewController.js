import { Review, ReviewPhoto } from '../models/index.js';
import fs from 'fs';
import path from 'path';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: ReviewPhoto,
          as: 'reviewPhotos',
          attributes: ['id', 'photoUrl'],
        },
      ],
    });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getReviewsByRegion = async (req, res) => {
  const { regionId } = req.query;

  try {
    const reviews = await Review.findAll({
      where: { regionId },
      include: [
        {
          model: ReviewPhoto,
          as: 'reviewPhotos',
          attributes: ['id', 'photoUrl'],
        },
      ],
    });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching reviews by region:', error);
    res.status(500).json({ error: 'Failed to fetch reviews by region' });
  }
};

export const getReviewPhotos = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const photos = await ReviewPhoto.findAll({ where: { reviewId } });
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error fetching review photos:', error);
    res.status(500).json({ error: 'Failed to fetch review photos' });
  }
};

export const deleteReviewPhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await ReviewPhoto.findByPk(photoId);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photoPath = path.join('uploads', 'reviews', photo.reviewId.toString(), path.basename(photo.photoUrl));
    if (fs.existsSync(photoPath)) {
      fs.unlinkSync(photoPath);
    }

    await photo.destroy();
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting review photo:', error);
    res.status(500).json({ error: 'Failed to delete review photo' });
  }
};

export const addUserPhoto = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const reviewDir = path.join('uploads', 'reviews', reviewId);

    if (!fs.existsSync(reviewDir)) {
      fs.mkdirSync(reviewDir, { recursive: true });
      console.log(`Directory created: ${reviewDir}`);
    }

    const userPhoto = `/uploads/reviews/${reviewId}/${req.file.originalname}`;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userPhoto) {
      const oldPhotoPath = path.join('uploads', review.userPhoto);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    review.userPhoto = userPhoto;
    await review.save();

    console.log('User photo saved:', review.userPhoto);

    res.status(200).json({ message: 'User photo added successfully', userPhoto });
  } catch (error) {
    console.error('Error adding user photo:', error);
    res.status(500).json({ error: 'Failed to add user photo' });
  }
};

export const addReviewPhotos = async (req, res) => {
  try {
    const { reviewId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const newPhotos = req.files.map((file) => ({
      reviewId,
      photoUrl: `/uploads/reviews/${reviewId}/${file.originalname}`,
    }));

    const createdPhotos = await ReviewPhoto.bulkCreate(newPhotos);

    res.status(201).json({ photos: createdPhotos });
  } catch (error) {
    console.error('Error adding review photos:', error);
    res.status(500).json({ error: 'Failed to add review photos' });
  }
};