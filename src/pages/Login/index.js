/* eslint-disable max-len */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config/ReactotronConfig';
import { Overlay } from 'react-native-elements';
import {
  Keyboard, ActivityIndicator, Platform, Dimensions,
} from 'react-native';

import axios from 'axios';

import {
  ImputContainer,
  Logo,
  ImageButton,
} from './styles';

import {
  GeneralContainer,
  GeneralInputText,
  GeneralButton,
  GeneralButtonText,
  GeneralErrorText,
  GeneralHeaderText,
  GeneralItemList,
  GeneralButtonList,
  GeneralListContent,
  GeneralTitleList,
  GeneralTextListContent,
  GeneralHeaderModal,
  GeneralFooterContainer,
  GeneralModalView,
} from '~/generalStyles';


import logo from '~/assets/logoSolucom.png';

class Login extends Component {
    state = {
      usuario: '',
      senha: '',
      loading: false,
      error: false,
      msgError: '',
      config: 0,
      modalSistema: false,
      servidores: null,
    };


    configuration = async () => {
      const { config } = this.state;
      const count = config + 1;
      this.setState({ config: count });
      if (count > 5) {
        const { navigation } = this.props;
        navigation.navigate('Configuration');
      }
    };

    //= ==========================================================================

    login = async () => {
      Keyboard.dismiss();
      const { usuario, senha } = this.state;
      const servers = JSON.parse(await AsyncStorage.getItem('@Solucom:servidores'));


      if (!usuario || !senha) {
        this.setState({ error: true, msgError: 'Preencha todos os campos!' });
      } else if (servers.length > 0) {
        if (servers.length > 1) {
          this.setState({ servidores: servers });
          this.setState({ modalSistema: true });
        } else {
          AsyncStorage.setItem('@Solucom:server', JSON.stringify(servers[0]));
          this.setState({ loading: true });
          await this.checkUser(usuario, senha);
        }
      } else {
        this.setState({ error: true, msgError: 'Não existe configuração de servidor cadastrada!' });
      }
    };

    //= ==========================================================================

    checkUser = async (usuario, senha) => {
      const server = JSON.parse(await AsyncStorage.getItem('@Solucom:server'));

      await axios
        .post(`${server.url}/login`, { usuario, senha })
        .then((response) => {
          if (response.status === 201) {
            this.setState({ loading: false, error: true, msgError: response.data.msg });
          } else {
            AsyncStorage.setItem('@Solucom:usuario', JSON.stringify(response.data.usuario[0]));
            AsyncStorage.setItem('@Solucom:token', response.data.token);
            const { navigation } = this.props;
            navigation.navigate('Main');
          }
        })
        .catch(() => {
          this.setState({ loading: false, error: true, msgError: 'Erro na requisição ao servidor!' });
        });
    };

    //= ===============================================================================================

    selecionaServidor = async (item) => {
      const { usuario, senha } = this.state;
      AsyncStorage.setItem('@Solucom:server', JSON.stringify(item));
      this.setState({ loading: true, modalSistema: false });
      await this.checkUser(usuario, senha);
    };

    //= ===============================================================================================
    renderListItem = ({ item }) => (
      <GeneralButtonList onPress={() => this.selecionaServidor(item)} style={{ marginLeft: 15, marginRight: 15 }}>
        <GeneralListContent>
          <GeneralTitleList> SERVIDOR: {item.servidor} </GeneralTitleList>
          <GeneralTextListContent>DATA: {item.url} </GeneralTextListContent>
        </GeneralListContent>
      </GeneralButtonList>
    );

    cancela = () => {
      this.setState({ modalSistema: false });
    };

    render() {
      const {
        usuario, senha, loading, error, msgError, modalSistema, servidores,
      } = this.state;

      const screenWidth = Dimensions.get('window').width;

      return (
        <GeneralContainer>

          <ImageButton onPress={this.configuration}>
            <Logo source={logo} />
          </ImageButton>

          {error && <GeneralErrorText> {msgError} </GeneralErrorText>}

          <ImputContainer>
            <GeneralInputText
              autoCompleteType="off"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              placeholder="USUARIO"
              underlineColorAndroid="transparent"
              textAlign="center"
              value={usuario}
              onChangeText={textUsuario => this.setState({ usuario: textUsuario.toUpperCase() })}
            />

            <GeneralInputText
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="SENHA"
              underlineColorAndroid="transparent"
              value={senha}
              textAlign="center"
              onChangeText={textSenha => this.setState({ senha: textSenha.toUpperCase() })}
            />

            <GeneralButton onPress={this.login}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <GeneralButtonText>LOGIN</GeneralButtonText>
              )}
            </GeneralButton>
          </ImputContainer>

          <Overlay
            isVisible={modalSistema}
            windowBackgroundColor="rgba(255, 255, 255, .4)"
            overlayBackgroundColor="#4040a1"
            width={screenWidth - 60}
            height="auto"
            borderRadius={5}
          >
            <GeneralHeaderModal>
              <GeneralHeaderText> SERVIDOR </GeneralHeaderText>
            </GeneralHeaderModal>
            <GeneralModalView>

              <GeneralItemList
                data={servidores}
                keyExtractor={item => String(item.url)}
                renderItem={this.renderListItem}
              />

            </GeneralModalView>
            <GeneralFooterContainer>
              <GeneralButton onPress={this.cancela} style={{ marginBottom: 10 }}>
                <GeneralButtonText>CANCELAR</GeneralButtonText>
              </GeneralButton>
            </GeneralFooterContainer>
          </Overlay>

        </GeneralContainer>
      );
    }
}

export default Login;
