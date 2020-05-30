import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

const AlbumList = ({navigation}) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const dataObject = async () => {
      try {
        const {data} = await axios.get(
          'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=137290658%40N08&format=json&nojsoncallback=1',
        );
        console.log(data);
        setAlbums(data.photosets.photoset);
      } catch (err) {
        console.log(err);
      }
    };
    dataObject();
  }, [navigation]);

  if (!albums.length) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }
  return albums.map(album => (
    <AlbumDetail
      navigation={navigation}
      key={album.id}
      title={album.title._content}
      albumId={album.id}
    />
  ));
};
export default AlbumList;
