import React, {useState} from 'react';
import {Text, View, Image, Linking} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import {List} from 'react-native-paper';
import axios from 'axios';
import {API, KEY, COMMENTS} from '../constants/constants';

const PhotoDetail = ({title, imageUrl, imageId}) => {
  const [comments, setComments] = useState(null);
  const [clicked, clickIt] = useState(false);

  const getComments = async () => {
    try {
      const {data} = await axios.get(
        `${API}${COMMENTS}&api_key=${KEY}&photo_id=${imageId}&format=json&nojsoncallback=1`,
      );
      setComments(data.comments.comment);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image style={thumbnailStyle} source={{uri: imageUrl}} />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
        </View>
      </CardSection>

      <CardSection>
        <Image style={imageStyle} source={{uri: imageUrl}} />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(imageUrl)}>Open</Button>
      </CardSection>

      <CardSection>
        <Button
          onPress={() => {
            getComments();
            clickIt(clicked => !clicked);
          }}>
          <Text>Comments</Text>
        </Button>
      </CardSection>
      {clicked &&
        comments &&
        comments.map((comment, index) => {
          return (
            <CardSection key={index}>
              <List.Item
                title={comment.realname}
                description={comment._content}
                style={{flex: 1}}
              />
            </CardSection>
          );
        })}
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerTextStyle: {
    fontSize: 18,
  },
  thumbnailStyle: {
    height: 50,
    width: 50,
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  },
};

export default PhotoDetail;
