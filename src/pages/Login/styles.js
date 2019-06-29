import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors: ['#4169E1', '#4169E1'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
})`
  flex: 1;
  justify-content: center;
`;

export const ImputContainer = styled.View`
  margin: 0 30px;
       `;

export const Logo = styled.Image`
  padding: 10px;
  align-self: center;
  margin-bottom: 25px;
`;

export const InputText = styled.TextInput`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
`;

export const SingInButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const ImageButton = styled.TouchableOpacity``;

export const SingInButtonText = styled.Text`
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;

export const ErrorText = styled.Text`
  font-size: 12px;
  color: #c94c4c;
  text-align: center;
`;
