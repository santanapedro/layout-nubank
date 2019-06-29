import styled from 'styled-components/native';
import { Animated, StyleSheet } from 'react-native';

export const Container = styled(Animated.ScrollView)`
  margin: 0 30px;
`;

export const Logo = styled.Image`
  padding: 10px;
  align-self: center;
`;

export const Nav = styled.View`
  margin-top: 30px;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-top-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
export const NavItems = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;
export const NavText = styled.Text`
  font-size: 15px;
  color: #f0f0f0;
  margin-left: 20px;
`;

export const SingOutButton = styled.TouchableOpacity`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const VersaoButton = styled.TouchableOpacity`
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const SingOutButtonText = styled.Text`
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;
