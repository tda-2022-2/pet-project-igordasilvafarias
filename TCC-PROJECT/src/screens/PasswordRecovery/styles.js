import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 25px;

`;

export const TitleWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 5px 0 5px;  
`;

export const Title = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

export const Subtitle = styled.Text`
  color: ${props => props.theme.colors.grey};
  text-align: center;
  line-height: 18px;
`;

export const FormContainer = styled.ScrollView`
  flex: 1;
  width: 100%;

  background-color: ${props => props.theme.colors.lighten};
  border-top-color: ${props => props.theme.colors.light};
`;

export const LoginForm = styled.View`
  align-items: center;
  width: 100%;
  padding: 10px 15px;

`;