import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  
  height: 100%;
`;

export const CameraContainer = styled.View`
  /* flex: 2;
  align-self: stretch; */
  width: 100%;
  height: 60%;
  overflow: hidden;
  background: ${ props => props.theme.colors.black };
`;

export const Camera = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;    
`

export const CameraInside = styled.View`
  width: 60%;
  height: 55%;
  border: 2px solid rgba(255, 255, 255, 0.5);
`;

export const InputFormContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${ props => props.theme.colors.secundary };
  padding: 15px;
  margin-bottom: 20px;
`