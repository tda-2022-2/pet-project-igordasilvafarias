import styled from 'styled-components/native';

import Card from '../../../components/Card';

export const TestContainer = styled.View `

`;


export const Content = styled.View`
  width: 100%;
  height: 100%;
`;

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

export const HistoryCard = styled(Card)`
  margin-bottom: 16px;
`;

export const HeardCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: ${ props => props.theme.colors.light };
  border-bottom-width: 1px;

  margin-bottom: 24px;
`;

export const FooterCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-top-color: ${ props => props.theme.colors.light };
  border-top-width: 1px;

  margin-top: 24px;
`;

export const ProductListContainer = styled.View`

`;

export const Product = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const ProductColumn = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${ props => props.width ? `${ props.width }%` : `100%` };
`;

export const ProductText = styled.Text`

`;