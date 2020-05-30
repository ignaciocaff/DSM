import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import {ActivityIndicator} from 'react-native';
import {API, KEY, USER, ALBUMS} from '../constants/constants';

const AlbumList = ({navigation}) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const dataObject = async () => {
      try {
        const {data} = await axios.get(
          `${API}${ALBUMS}&api_key=${KEY}&user_id=${USER}&format=json&nojsoncallback=1`,
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
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={albums}
        renderItem={({item}) => (
          <AlbumDetail
            key={item.id}
            title={item.title._content}
            albumId={item.id}
            navigation={navigation}
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
export default AlbumList;
