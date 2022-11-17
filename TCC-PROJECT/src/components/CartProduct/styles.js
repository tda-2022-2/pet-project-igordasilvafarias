import styled from 'styled-components/native';
import Card from '../Card'

export const CardProduct = styled(Card)`
  margin-bottom: 10px;
`;


export const Container = styled.View`
  height: 150px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

export const ColumnView = styled.View`
    height: 100%;
    width: ${ props => props.width + '%' };
    justify-content: center;
`;

export const RowView = styled.View`
    height: 33%;
    width: 100%;
    padding: 5px;
    flex-direction: row;
    justify-content: space-between;

`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 66%;
  object-fit: cover;

`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${ props => props.theme.colors.grey};
  font-weight: 700;
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
