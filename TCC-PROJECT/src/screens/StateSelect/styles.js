import styled from 'styled-components/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
`;

//ScrollView
export const Content = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px 10px 0 10px;
`;

export const Header = styled.View `
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const ContainerButton = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const State = styled.TouchableOpacity`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.isActive ? props.theme.colors.light : props.theme.colors.lighten};
  border-width: ${props => props.isActive ? `1px` : `0`};
  border-color: ${props => props.isActive ? props.theme.colors.lighten : props.theme.colors.light};
`
export const Name = styled.Text`
  font-size: 15px;
  color: ${(props) => (props.theme.colors.black)};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`