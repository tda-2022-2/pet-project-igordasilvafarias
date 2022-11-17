import React from 'react';

import { Text } from './styles';

export default function MainTitle({
  title,
  size
}) {
  return (
    <Text 
      size={size}
    >
      {title}
    </Text>
  );
}