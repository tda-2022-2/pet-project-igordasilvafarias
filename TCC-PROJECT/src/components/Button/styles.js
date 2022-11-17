import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  height: 32px;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  width: ${ props => props.width ? `${ props.width }%` : '100%'};
  border-radius: ${(props) => (props.radius ? `24px` : '0')};

  background-color: ${ 
    (props) => props.isActive ? 
      props.theme.colors.primary : 
      'transparent'
    };
`;

export const Text = styled.Text`
  color: ${ 
    (props) => props.isActive ? 
      props.theme.colors.white : 
      props.theme.colors.grey };
  font-weight: 600;
  font-size: 14px;

`;

export const TextDetails = styled.Text `
  font-size: 14px;
  color: ${ (props) => props.theme.colors.grey };
`;
