/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import {
  Container, TabsContainer, TabItem, TabText, ButtonTab,
} from './styles';
import '~/config/ReactotronConfig';

class Tabs extends Component {
  state = {
    usuario: null,
  };

  async componentDidMount() {
    const usuario = JSON.parse(await AsyncStorage.getItem('@Solucom:usuario'));
  }

  render() {
    const { translateY } = this.props;

    return (
      <Container
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 380],
                outputRange: [1, 70],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: translateY.interpolate({
            inputRange: [0, 380],
            outputRange: [1, 0.3],
            extrapolate: 'clamp',
          }),
        }}
      >
        <TabsContainer>
          <ButtonTab onPress={() => {}}>
            <TabItem>
              <Icon name="person" size={24} color="#FFF" />
              <TabText>MENU</TabText>
            </TabItem>
          </ButtonTab>

        </TabsContainer>
      </Container>
    );
  }
}
export default withNavigation(Tabs);
