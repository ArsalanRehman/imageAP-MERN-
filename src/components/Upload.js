import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ProfilePicture from './Display';

function ImageUploader() {
  const [get, set] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  // useEffect(() => {
  //   handleChange();
  // }, [handleSubmit]);

  // useEffect(() => {
  //   handleChange();
  // }, [set]);
  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };
  const getImage = async () => {
    await axios.get('http://127.0.0.1:5050/api/v1/images/getImage/map.png');
    setUrl('http://127.0.0.1:5050/api/v1/images/getImage/map.png');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userImage', image);

    axios
      .post('http://127.0.0.1:5050/api/v1/images/uploadImage', formData)
      .then((response) => {
        set(response.data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
      <button type="submit" onClick={getImage}>
        GET
      </button>
      {/* <ProfilePicture imageUrl={image} /> */}
      {/* <ProfilePicture imageUrl={getImage} /> */}
      <img src={url} alt="" />
    </form>
  );
}
export default ImageUploader;
