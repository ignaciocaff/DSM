import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PhotoDetail from './PhotoDetail';
import {Text} from 'react-native';
const PhotoList = ({route}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const dataObject = async () => {
      try {
        const {data} = await axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${
            route.params.albumId
          }&user_id=137290658%40N08&format=json&nojsoncallback=1`,
        );
        console.log(data);
        setPhotos(data.photoset.photo);
      } catch (err) {
        console.log(err);
      }
    };
    dataObject();
  }, [route]);

  if (!photos.length) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  return photos.map(photo => (
    <PhotoDetail
      key={photo.title}
      title={photo.title}
      imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${
        photo.id
      }_${photo.secret}.jpg`}
      imageId={photo.id}
    />
  ));
};

export default PhotoList;
