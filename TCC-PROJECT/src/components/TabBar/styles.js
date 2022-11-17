import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

export const Container = styled.SafeAreaView`
  width: ${ props => props.width ? `${ props.width }%` : '100%'};
  background-color: ${ (props) => props.theme.colors.white };
  margin-top: 10px;
  position: absolute;
  bottom: 0;
`;

export const Inside = styled.View`
  align-self: stretch;
  padding: 5px 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MyOrdersButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;

`;

export const IconBasket = styled(Icon)`
  color: ${ (props) => props.theme.colors.primary };
  font-size: 14px;
  margin-right: 8px;
`;

export const TitleMyOrders = styled.Text`
  color: ${ (props) => props.theme.colors.primary };
  font-size: 14px;
`;

export const HomeButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${ (props) => props.theme.colors.primary };
`;

export const IconHome = styled(Icon)`
  color: ${ (props) => props.theme.colors.white };
  font-size: 22px;
`;

