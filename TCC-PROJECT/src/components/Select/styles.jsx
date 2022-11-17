import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  flex-direction: row;
  width: ${ props => props.width ? `${ props.width }%` : '100%' };
  border-bottom-width: 1px;
  border-bottom-color: ${ (props) => props.theme.colors.light };
  margin-top: 25px;
  max-height: 30%;
  justify-content: space-between;
  align-items: center;
  padding: 5px 1px;
`;

export const SelectOptions = styled.Text`
  font-size: 15px;
  color: ${ (props) => (props.editable ? props.theme.colors.grey : props.theme.colors.black) };
`;

export const Icon = styled(Feather)`
  font-size: 15px;
  color: ${ (props) => (props.editable ? props.theme.colors.grey : props.theme.colors.black) };
`;

export const ErrorMessage = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.error};
`;