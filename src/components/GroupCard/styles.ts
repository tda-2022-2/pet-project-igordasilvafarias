import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { UsersThree } from 'phosphor-react-native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 32,
  weight: 'fill',
  color: theme.COLORS.GREEN_700
}))`
  margin-right: 20px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;