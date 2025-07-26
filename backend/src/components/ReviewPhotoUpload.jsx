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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;

const ReviewPhotoUpload = (props) => {
  const { record } = props;
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (record?.id) {
      fetch(`${publicUrl}/api/reviews/${record.id}/review-photos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          return response.json();
        })
        .then((data) => setPhotos(data))
        .catch((error) => {
          console.error('Error fetching review photos:', error);
          setError('Помилка завантаження фотографій');
        });
    }
  }, [record?.id]);

  const handleAddPhotos = (event) => {
    if (!record?.id) {
      setError('Спочатку збережіть відгук');
      return;
    }

    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    setError(null);

    fetch(`${publicUrl}/api/reviews/${record.id}/review-photos`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.photos)) {
          console.error('Invalid response format:', data);
          throw new Error('Invalid response format from server');
        }
        setPhotos((prev) => [...prev, ...data.photos]);
        event.target.value = '';
      })
      .catch((error) => {
        console.error('Error uploading photos:', error);
        setError('Помилка завантаження фотографій');
      });
  };

  const handleDeletePhoto = (photoId) => {
    if (!record?.id) {
      setError('Спочатку збережіть відгук');
      return;
    }

    fetch(`${publicUrl}/api/reviews/${record.id}/review-photos/${photoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete photo');
        }
        setPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
      })
      .catch((error) => {
        console.error('Error deleting photo:', error);
        setError('Помилка видалення фотографії');
      });
  };

  return (
    <>
      <h4>Фото відгуку</h4>
      <UploadContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <PhotoList>
          {photos.map((photo) => (
            <PhotoItem key={photo.id}>
              <UploadedImage
                src={`${publicUrl}${photo.photoUrl}`}
                alt="Review Photo"
              />
              <DeleteButton onClick={() => handleDeletePhoto(photo.id)}>Видалити</DeleteButton>
            </PhotoItem>
          ))}
        </PhotoList>
        <FileInput 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleAddPhotos}
          disabled={!record?.id}
        />
        {!record?.id && (
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
            Спочатку збережіть відгук для завантаження фотографій
          </div>
        )}
      </UploadContainer>
    </>
  );
};

export default ReviewPhotoUpload;