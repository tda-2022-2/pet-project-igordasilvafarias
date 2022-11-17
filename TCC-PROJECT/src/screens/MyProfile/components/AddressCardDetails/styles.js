import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export const Container = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
  border-bottom-width: 2px;
  border-bottom-color: ${
    (props) => props.theme.colors.light
  };
  padding: 0 10px 20px 10px;
`

export const NameContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`

export const AddressContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

export const TitleAddress = styled.Text`
  font-size: ${props => props.size ? `${ props.size }px` : '15px'};
  color: ${ (props) => (props.editable ? props.theme.colors.grey : props.theme.colors.black) };
`;

export const IconsCard = styled(Icon)`
  color: ${ (props) => props.theme.colors.primary };
  font-size: 20px;
`;