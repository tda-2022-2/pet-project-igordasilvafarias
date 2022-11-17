import styled from 'styled-components/native';

export const Text = styled.Text`
  font-size: ${ props => props.size ? `${ props.size }px` : '20px'};
  color: ${ (props) => props.theme.colors.grey };
  font-weight: 700;
`