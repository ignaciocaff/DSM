import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, FlatList, Text} from 'react-native';
import PhotoDetail from './PhotoDetail';
import {ActivityIndicator} from 'react-native';
import {API, KEY, USER, IMAGES} from '../constants/constants';

const PhotoList = ({route}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const dataObject = async () => {
      try {
        const {data} = await axios.get(
          `${API}${IMAGES}&api_key=${KEY}&photoset_id=${
            route.params.albumId
          }&user_id=${USER}&format=json&nojsoncallback=1`,
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
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <PhotoDetail
            key={item.key}
            title={item.title}
            imageId={item.id}
            imageUrl={`https://farm${item.farm}.staticflickr.com/${
              item.server
            }/${item.id}_${item.secret}.jpg`}
          />
        )}
      />
    </View>
  );
};
const styles = {
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default PhotoList;
