import styled from 'styled-components/native';

import Cards from '../../../../components/Card';

export const Container = styled.View `
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
  padding: 20px;
`;

export const Header = styled.View `
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const ContainerButton = styled.View `
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Card = styled(Cards)`
  margin-bottom: 20px;
  margin-top: 20px;
  padding-top: 30px;
`

export const Title = styled.Text`
  color: ${ 
    (props) => props.theme.colors.red };
  font-weight: 600;
  font-size: 18px;
  align-self: center;
  text-align: center;
`;

export const TextDetails = styled.Text `
  font-size: 14px;
  align-self: center;
  text-align: center;
  margin: 10px 0;
  color: ${ (props) => props.theme.colors.grey };
`;