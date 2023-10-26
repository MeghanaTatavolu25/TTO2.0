import React from 'react';
import {Box} from '@adminjs/design-system';

const shortenParagraph = (paragraph, maxLength) => {
  if (paragraph.length <= maxLength) return paragraph;
  return paragraph.substring(0, maxLength) + '...';
};
 
const ShortenedParagraph = (props) => {
  const { record, property } = props;
  const longParagraph = record.params[property.name];
  const maxLength = 10;
  return (
    React.createElement(Box, null, shortenParagraph(longParagraph, maxLength))
  );
};

export default ShortenedParagraph;
