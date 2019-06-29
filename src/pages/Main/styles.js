import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HeaderModal = styled.View`
  height: 54px;
  padding-top: ${getStatusBarHeight()}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4040a1;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 10px;
  align-items: center;
`;

export const HeaderContainer = styled.View`
  height: ${getStatusBarHeight() + 54}px;
  padding-top: ${getStatusBarHeight()}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4040a1;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
`;

export const ButtonFooter = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;
export const ButtonLista = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 5px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const TitleList = styled.Text`
  font-size: 10px;
  color: #4040a1;
  font-weight: bold;
`;

export const TextListContent = styled.Text`
  font-size: 10px;
  color: #4040a1;
`;

export const ListContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const FooterContainer = styled.View`
  height: ${getStatusBarHeight() + 65}px;
  padding-top: ${getStatusBarHeight()}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4040a1;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 10px;
`;

export const ButtonFooterText = styled.Text`
  font-size: 15px;
  color: #f0f0f0;
`;

export const ItemLista = styled.FlatList``;

export const ModalViewNotificacao = styled.ScrollView.attrs({
  horizontal: false,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 10 },
  showsVerticalScrollIndicator: false,
})`
  max-height: 250px;
  margin-top: 10px;
  border-radius: 4px;
`;

export const SubHeader = styled.View`
  background-color: #4040a1;
  flex-direction: column;
  align-items: center;
`;

export const SubHeaderText = styled.Text`
  font-size: 10px;
  color: #fff;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const Container = styled.View`
  flex: 1;
  background: #4040a1;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 350px;
  z-index: 5;
`;

export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 10px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

export const ButtonData = styled.TouchableOpacity``;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const CardContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const TextNotification = styled.Text`
  font-size: 10px;
  color: #fff;
  margin-top: 1px;
`;

export const DataText = styled.Text`
  font-size: 18px;
  color: #999;
`;

export const Description = styled.Text`
  font-size: 32px;
  margin-top: 3px;
  color: #333;
`;
export const CardFooter = styled.View`
  padding: 30px;
  background: #eee;
  border-radius: 4px;
`;
export const Annotation = styled.Text`
  font-size: 12px;
  color: #333;
`;
