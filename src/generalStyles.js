import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const GeneralContainer = styled(LinearGradient).attrs({
  colors: ['#4169E1', '#4169E1'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
})`
  flex: 1;
  justify-content: center;
`;

export const GeneralInputText = styled.TextInput`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
`;

export const GeneralButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

export const GeneralButtonText = styled.Text`
  font-size: 10px;
  color: #fff;
  font-weight: bold;
`;

export const GeneralErrorText = styled.Text`
  font-size: 12px;
  color: #c94c4c;
  text-align: center;
`;

export const GeneralHeaderContainer = styled.View`
  height: ${getStatusBarHeight() + 54}px;
  padding-top: ${getStatusBarHeight()}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4169E9;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 10px;
`;

export const GeneralHeaderText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const GeneralImputContainer = styled.View`
  margin: 0 30px;
  background-color: #4169E9;
`;

export const GeneralItemList = styled.FlatList``;

export const GeneralHeaderButton = styled.TouchableOpacity``;

export const GeneralButtonList = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 5px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;
export const GeneralTitleList = styled.Text`
  font-size: 10px;
  color: #4040a1;
  font-weight: bold;
`;

export const GeneralTextListContent = styled.Text`
  font-size: 10px;
  color: #4040a1;
`;

export const GeneralListContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const GeneralHeaderModal = styled.View`
  height: 54px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4040a1;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 10px;
  align-items: center;
`;

export const GeneralModalView = styled.View`
  margin-top: 10px;
  border-radius: 4px;
`;

export const GeneralFooterContainer = styled.View`
  height: ${getStatusBarHeight() + 65}px;
  padding-top: ${getStatusBarHeight()}px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.2);
  background-color: #4040a1;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 10px;
`;

export const GeneralButtonFooter = styled.TouchableOpacity`
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  width: 60px;
`;