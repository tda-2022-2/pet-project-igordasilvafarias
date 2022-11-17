import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  height: 32px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  width: ${ props => props.width ? `${ props.width }%` : '100%'};
  background-color: 'transparent';
`;

export const Text = styled.Text`
  color: ${ props => props.theme.colors.primary };
  font-weight: 600;
  font-size: 14px;

`;
