import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
`;

export const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 30px 10px 0 10px;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const ContainerProducts = styled.View`
  /* border: 1px solid red; */
  flex: 1;
`;
