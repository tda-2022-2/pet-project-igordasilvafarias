import styled from 'styled-components/native';

import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  width: ${ props => props.width ? `${ props.width }%` : '100%'};
  border-bottom-width: 1px;
  border-bottom-color: ${ (props) => props.theme.colors.light };
  margin-top: 30px;
  padding-bottom: 5px;
`;

export const Text = styled(TextInputMask)`
  font-size: 15px;
  color: ${ (props) => (props.editable ? props.theme.colors.grey : props.theme.colors.black) };
`;

export const ContainerError = styled.View`
  //width: ${ props => props.width ? `${ props.width }%` : '100%'};
`

export const ContainerMain = styled.View `
  width: ${ props => props.width ? `${ props.width }%` : '100%'};
  flex-direction: column;
`

export const ErrorMessage = styled.Text`
  font-size: 15px;
  text-align: center;
  color: ${(props) => props.theme.colors.error};
`;