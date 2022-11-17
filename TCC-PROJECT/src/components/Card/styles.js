import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  padding: 10px;
  background-color: ${ props => props.theme.colors.white };
  border: 0.5px solid ${ props => props.theme.colors.light };
  border-radius: 4px;
`;
