import React from 'react';
import axios from 'axios';
import CommentsDetail from './CommentsDetail';
const CommentsList = ({imageId}) => {
  const dataObject = async () => {
    const {data} = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${imageId}&user_id=137290658%40N08&format=json&nojsoncallback=1`,
    );
    return data.map(comment => (
      <CommentsDetail realname={comment.realname} _content={comment._content} />
    ));
  };
};

export default CommentsList;
