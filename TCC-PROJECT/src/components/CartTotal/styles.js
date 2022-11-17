import styled from 'styled-components/native';
import Card from '../Card'

export const CardProduct = styled(Card)`
  margin-bottom: 10px;
  margin-top: 10px;
`;


export const Container = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;

export const ColumnView = styled.View`
    height: 100%;
    width: ${props => props.width + '%'};
    justify-content: center;

`;

export const RowView = styled.View`
    height: 50%;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 66%;
  object-fit: cover;

`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.grey};
  font-weight: 700;
`;

export const ProductTotal = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
`;

export const ProductText = styled.Text`
  font-size: ${props => props.title ? "10px" : "14px"};
  color: ${props => props.theme.colors.grey};
  font-weight: 400;
`;

export const QuantityButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;

`;
