import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${ props => props.theme.colors.lighten };
`;

export const FormContainer = styled.ScrollView`
  width: 100%;
  background-color: ${ props => props.theme.colors.lighten };
  border-top-color: ${ props => props.theme.colors.light };
  border-top-width: 1px;
  position: relative;
`;

export const LoginForm = styled.View`
  align-items: center;
  width: 100%;
  padding: 25px 15px;
`;

export const ButtonsWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px 0 20px 0;
`;