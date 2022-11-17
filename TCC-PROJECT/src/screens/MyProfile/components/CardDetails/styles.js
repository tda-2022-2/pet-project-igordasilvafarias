import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  border-bottom-width: 2px;
  border-bottom-color: ${
    (props) => props.theme.colors.light
  };
  padding: 0 10px 20px 10px;
`

export const Title = styled.Text`
  font-size: ${props => props.size ? `${ props.size }px` : '20px'};
  color: ${ (props) => (props.editable ? props.theme.colors.grey : props.theme.colors.black) };
`;

export const IconX = styled(Icon)`
  color: ${ (props) => props.theme.colors.primary };
  font-size: 20px;
`;