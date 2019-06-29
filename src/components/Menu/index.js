/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';
import {
  Alert,
} from 'react-native';

import {
  Container,
  SingOutButton,
  SingOutButtonText,
  VersaoButton,
} from './styles';

class Menu extends Component {
  state = {
    usuario: null,
  };

  sair = () => {
    Alert.alert(
      'Opa!',
      'Deseja realmente sair do App ?',
      [
        { text: 'CANCELAR', onPress: () => {} },
        {
          text: 'SAIR',
          onPress: () => {
            this.singOut();
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  singOut = () => {
    AsyncStorage.removeItem('@Solucom:usuario');
    AsyncStorage.removeItem('@Solucom:token');
    const { navigation } = this.props;
    navigation.navigate('Login');
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { translateY } = this.props;

    return (
      <Container
        style={{
          opacity: translateY.interpolate({
            inputRange: [0, 150],
            outputRange: [0, 1],
          }),
        }}
      >

        <SingOutButton onPress={this.sair}>
          <SingOutButtonText>SAIR</SingOutButtonText>
        </SingOutButton>

        <VersaoButton>
          <SingOutButtonText>1.00</SingOutButtonText>
        </VersaoButton>
      </Container>
    );
  }
}
export default withNavigation(Menu);
