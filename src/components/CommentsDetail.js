import React from 'react';
import CardSection from './CardSection';
import {List} from 'react-native-paper';

const CommentsDetail = ({realname, _content}) => {
  return (
    <CardSection>
      <List.Item title={realname} description={_content} />
    </CardSection>
  );
};
export default CommentsDetail;
