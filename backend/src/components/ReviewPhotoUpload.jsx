import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const publicUrl = window?.AdminJS?.env?.PUBLIC_URL || '';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 400px;
  gap: 15px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px auto;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 10px;
    max-height: 300px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 8px;
    max-height: 250px;
  }
`;

const PhotoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

const PhotoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const UploadedImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 80px;
    max-height: 80px;
  }

  @media (max-width: 480px) {
    max-width: 60px;
    max-height: 60px;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #e60000;
  }
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border-color: #038405;
  }

  @media (max-width: 768px) {
    padding: 8px;
    width: 80%;
  }

  @media (max-width: 480px) {
    padding: 5px;
    width: 80%;
  }
`;

const ReviewPhotoUpload = (props) => {
  const { record } = props;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (record?.id) {
      fetch(`${publicUrl}/api/reviews/${record.id}/review-photos`)
        .then((response) => response.json())
        .then((data) => setPhotos(data))
        .catch((error) => console.error('Error fetching review photos:', error));
    }
  }, [record?.id]);

  const handleAddPhotos = (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('photos', file);
    });

    fetch(`${publicUrl}/api/reviews/${record.id}/review-photos`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prev) => [...prev, ...data.photos]);
      })
      .catch((error) => console.error('Error uploading photos:', error));
  };

  const handleDeletePhoto = (photoId) => {
    fetch(`${publicUrl}/api/reviews/${record.id}/review-photos/${photoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      })
      .catch((error) => console.error('Error deleting photo:', error));
  };

  return (
    <>
      <h4>Review Photos</h4>
      <UploadContainer>
      <PhotoList>
        {photos.map((photo) => (
          <PhotoItem key={photo.id}>
            <UploadedImage
              src={`${publicUrl}${photo.photoUrl}`}
              alt="Review Photo"
            />
            <DeleteButton onClick={() => handleDeletePhoto(photo.id)}>Delete</DeleteButton>
          </PhotoItem>
        ))}
      </PhotoList>
      <FileInput type="file" multiple accept="image/*" onChange={handleAddPhotos} />
    </UploadContainer>
    </>
  );
};

export default ReviewPhotoUpload;