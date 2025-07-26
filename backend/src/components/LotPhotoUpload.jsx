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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  margin: 0;
`;

const DeleteAllButton = styled.button`
  padding: 5px 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background-color: #ff5252;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;

const LoadingMessage = styled.div`
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;

const LotPhotoUpload = (props) => {
  const { record } = props;
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    if (record?.id) {
      fetch(`${publicUrl}/api/lots/${record.id}/photos`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch photos');
          }
          return response.json();
        })
        .then((data) => {
          const photosArray = Array.isArray(data) ? data : (data.photos || []);
          setPhotos(photosArray);
        })
        .catch((error) => {
          console.error('Error fetching lot photos:', error);
          setError('Помилка завантаження фотографій');
        });
    }
  }, [record?.id]);

  const handleAddPhotos = (event) => {
    if (!record?.id) {
      setError('Спочатку збережіть лот');
      return;
    }

    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    setError(null);

    fetch(`${publicUrl}/api/lots/${record.id}/photos`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload photos');
        }
        return response.json();
      })
      .then((data) => {
        const newPhotos = Array.isArray(data.photos) ? data.photos : [];
        setPhotos((prev) => [...prev, ...newPhotos]);
        event.target.value = '';
      })
      .catch((error) => {
        console.error('Error uploading photos:', error);
        setError('Помилка завантаження фотографій');
      });
  };

  const handleDeletePhoto = (photoId) => {
    if (!record?.id) {
      setError('Спочатку збережіть лот');
      return;
    }

    fetch(`${publicUrl}/api/lots/${record.id}/photos/${photoId}`, {
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

  const handleDeleteAllPhotos = async () => {
    if (!record?.id) {
      setError('Спочатку збережіть лот');
      return;
    }

    if (photos.length === 0) {
      return;
    }

    if (!confirm('Ви дійсно хочете видалити всі фотографії?')) {
      return;
    }

    setIsDeletingAll(true);
    setError(null);

    try {
      const deletePromises = photos.map(photo => 
        fetch(`${publicUrl}/api/lots/${record.id}/photos/${photo.id}`, {
          method: 'DELETE',
        })
      );

      await Promise.all(deletePromises);
      setPhotos([]);
    } catch (error) {
      console.error('Error deleting all photos:', error);
      setError('Помилка видалення всіх фотографій');
    } finally {
      setIsDeletingAll(false);
    }
  };

  return (
    <UploadContainer>
      <HeaderContainer>
        <Title>Фотографії лота</Title>
        {photos.length > 0 && (
          <DeleteAllButton 
            onClick={handleDeleteAllPhotos}
            disabled={isDeletingAll}
          >
            {isDeletingAll ? 'Видаляю...' : 'Видалити всі'}
          </DeleteAllButton>
        )}
      </HeaderContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isDeletingAll && <LoadingMessage>Видаляю всі фотографії...</LoadingMessage>}
      
      <PhotoList>
        {photos.map((photo) => (
          <PhotoItem key={photo.id}>
            <UploadedImage
              src={`${publicUrl}${photo.photoUrl}`}
              alt="Lot Photo"
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
          Спочатку збережіть лот для завантаження фотографій
        </div>
      )}
    </UploadContainer>
  );
};

export default LotPhotoUpload;