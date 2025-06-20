import React, { useState } from 'react';
import styled from 'styled-components';

const publicUrl = window?.AdminJS?.env?.PUBLIC_URL || '';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 300px;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px auto;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 8px;
    max-height: 250px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    gap: 5px;
    max-height: 200px;
  }
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-height: 150px;
  }

  @media (max-width: 480px) {
    max-height: 100px;
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

const UserPhotoUpload = (props) => {
  const { record, onChange } = props;
  const [userPhoto, setUserPhoto] = useState(record?.params?.userPhoto || '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('isUserPhoto', 'true');

    console.log('Uploading to:', `${publicUrl}/api/reviews/${record.id}/user-photo`);
    console.log('Record ID:', record.id);
    console.log('File:', file.name);

    fetch(`${publicUrl}/api/reviews/${record.id}/user-photo`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('User photo uploaded:', data);
        setUserPhoto(data.userPhoto);
        setIsUploading(false);
        
        if (onChange) {
          onChange('userPhoto', data.userPhoto);
        }
      })
      .catch((error) => {
        console.error('Error uploading user photo:', error);
        setError(error.message);
        setIsUploading(false);
      });
  };

  return (
    <>
      <h6>Upload User Photo</h6>
      <UploadContainer>
        {userPhoto && (
          <UploadedImage
            src={`${publicUrl}${userPhoto}`}
            alt="User Photo"
          />
        )}
        {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
        {isUploading && <div style={{ color: 'blue', fontSize: '12px' }}>Uploading...</div>}
        <FileInput 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          disabled={isUploading}
        />
      </UploadContainer>
    </>
  );
};

export default UserPhotoUpload;