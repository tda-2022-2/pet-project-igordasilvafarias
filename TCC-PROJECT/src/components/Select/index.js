import React from 'react';

import {
  Container,
  Icon,
  SelectOptions,
  ErrorMessage
} from './styles';

export default function Select(props) {
  return (
    <>
      <Container {...props}>
      <SelectOptions>
        {props.title}
      </SelectOptions>
      <Icon name="chevron-down" />
      </Container>
      {props.error ? (<ErrorMessage>{props.error}</ErrorMessage>) : null}
    </>
  );
}
