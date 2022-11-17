import styled from 'styled-components/native';

import Cards from '../../components/Card';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
`;

export const Content = styled.ScrollView `
  width: 100%;
  height: 100%;
  padding: 30px 10px 0 10px;
`;

export const Header = styled.View `
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const ContainerInputs = styled.View `
  flex: 1;
`;

export const CardInputs = styled(Cards)`
  margin-bottom: 16px;
`;

export const TextNotFoundCard = styled.Text`
  font-size: ${props => props.size ? `${ props.size }px` : '20px'};
  color: ${(props) => props.theme.colors.light};
  font-weight: 700;
  margin-top: 25px;
`

export const ContainerButton = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const Footer = styled.View `
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: center;
  align-items: center;
`

export const LoadContainer = styled.View`
  height: ${props => props.size ? `${ props.size}px` : '50px'};
  justify-content: center;
  align-items: center;
`;