import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  padding: 46px;
  background-color: ${ props => props.theme.colors.white};
`;

export const ImageLogo = styled.Image`
  object-fit: cover;
`;