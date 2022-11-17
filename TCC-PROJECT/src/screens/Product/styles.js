import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ props => props.theme.colors.light };
  height: 100%;
`;

export const Content = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 20px 10px 0 10px;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const ContainerProducts = styled.View`
  flex: 1;
`;

export const ColumnView = styled.View`
    height: ${ 
      props => props.height ? props.height + 'px' : '250px' };
    width: ${ props => props.width + '%' };
    justify-content: center;
    align-items: center;
`;

export const RowView = styled.View`
    /* height: 100%; */
    width: 100%;
    padding: 5px;
    flex-direction: row;
    justify-content: space-between;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProductText = styled.Text`
  font-size: ${ props => props.title ? "10px" : "14px" };
  color: ${ props => props.theme.colors.grey};
  font-weight: 400;
`;

export const QuantityButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;

`;

export const QuantityText = styled.Text`
  font-size: 16px;
  margin: 0 10px 5px 10px;
  color: ${ props => props.theme.colors.grey};
  font-weight: 700;
`;