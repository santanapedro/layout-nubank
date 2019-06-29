import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Container = styled(Animated.View)`
  height: 100px;
  margin-top: 20px;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})``;

export const TabItem = styled.View`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-left: 10px;
  padding: 10px;
  justify-content: space-between;
`;

export const TabText = styled.Text`
  font-size: 13px;
  color: #fff;
`;

export const ButtonTab = styled.TouchableOpacity``;

export const ModalCliente = styled.Modal`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  margin-left: 10px;
  padding: 10px;
`;

export const InputText = styled.TextInput`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
`;

export const ClienteButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const ButtonClienteText = styled.Text`
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;
