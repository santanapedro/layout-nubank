/* eslint-disable react/no-string-refs */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-plusplus */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config/ReactotronConfig';
import { Overlay } from 'react-native-elements';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import {
  Keyboard, ActivityIndicator, Platform, Alert, Dimensions,
} from 'react-native';

import {
  GeneralContainer,
  GeneralInputText,
  GeneralButton,
  GeneralButtonText,
  GeneralImputContainer,
  GeneralHeaderContainer,
  GeneralHeaderText,
  GeneralHeaderButton,
  GeneralItemList,
  GeneralButtonList,
  GeneralListContent,
  GeneralTitleList,
  GeneralTextListContent,
  GeneralHeaderModal,
  GeneralButtonFooter,
  GeneralFooterContainer,
  GeneralModalView,

} from '~/generalStyles';

class Configuration extends Component {
    state = {
      url: null,
      servidor: null,
      servidores: [],
      loading: true,
      modalSenha: true,
      senha: null,
    };

    //= ===============================================================================================

    componentDidMount = async () => {
      const servers = JSON.parse(await AsyncStorage.getItem('@Solucom:servidores'));
      if (servers) {
        this.setState({ servidores: servers });
      } else {
        this.setState({ servidores: [] });
      }
      this.setState({ loading: false });
    }

    //= ===============================================================================================

    salvar = async () => {
      this.setState({ loading: true });
      const { servidor, url, servidores } = this.state;
      if (!servidor || !url) {
        this.setState({ loading: false });
        Alert.alert(
          'Opa!',
          'Preencha todos os campos da configuração do servidor!',
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: false },
        );
      } else {
        Keyboard.dismiss();
        let existe = false;
        for (let i = 0; i < servidores.length; i++) {
          if (servidor === servidores[i].servidor) {
            existe = true;
          }
        }

        if (existe) {
          this.setState({ loading: false });
          Alert.alert(
            'Opa!',
            'Ja existe um servidor cadastrado com esse nome!',
            [{ text: 'OK', onPress: () => {} }],
            { cancelable: false },
          );
        } else {
          const data = { servidor, url };
          const srv = servidores;
          srv.push(data);

          this.setState({ servidores: srv, servidor: null, url: null });
          AsyncStorage.setItem('@Solucom:servidores', JSON.stringify(srv));
          this.setState({ loading: false });
        }
      }
    };

    //= ===============================================================================================

    perguntaDeletaServidor = async (item) => {
      Alert.alert(
        'Deletar Servidor',
        `Deseja realmente deletar o servidor ${item.servidor}`,
        [{ text: 'DELETAR', onPress: () => { this.deletaServidor(item); } }, { text: 'SAIR', onPress: () => {} }],
        { cancelable: false },
      );
    }

    //= ===============================================================================================

    deletaServidor = async (item) => {
      this.setState({ loading: true });
      const { servidores } = this.state;
      const srv = [];

      for (let i = 0; i < servidores.length; i++) {
        if (item.servidor !== servidores[i].servidor) {
          const { servidor, url } = servidores[i];
          const data = { servidor, url };
          srv.push(data);
        }
      }
      this.setState({ servidores: srv });
      AsyncStorage.setItem('@Solucom:servidores', JSON.stringify(srv));
      this.setState({ loading: false });
    }

    //= ===============================================================================================

    renderListItem = ({ item }) => (
      <GeneralButtonList onLongPress={() => this.perguntaDeletaServidor(item)} style={{ marginLeft: 15, marginRight: 15 }}>
        <GeneralListContent>
          <GeneralTitleList> SERVIDOR: {item.servidor} </GeneralTitleList>
          <GeneralTextListContent> URL: {item.url} </GeneralTextListContent>
        </GeneralListContent>
      </GeneralButtonList>
    );

    volta = () => {
      // eslint-disable-next-line react/prop-types
      const { navigation } = this.props;
      navigation.navigate('Login');
    };

    //= ==========================================================================

    validaSenha = () => {
      const { senha } = this.state;
      const data = String(moment().format('DD/MM/YYYY'));
      const ano = data.slice(6, 10);
      const dia = data.slice(0, 2);
      const mes = data.slice(3, 5);
      const senhaDoDia = parseInt(ano) + parseInt(dia + mes) + (parseInt(dia) + 777) * 2;

      if (parseInt(senha) === senhaDoDia) {
        this.setState({ modalSenha: false });
      } else {
        this.refs.toast.show('Senha Incorreta!');
      }
    };

    //= ==========================================================================
    render() {
      const {
        servidor, url, servidores, loading, modalSenha, senha,
      } = this.state;

      const screenWidth = Dimensions.get('window').width;

      return (
        <GeneralContainer>
          <GeneralHeaderContainer>
            <GeneralHeaderButton>
            <Icon name="keyboard-arrow-left" size={28} color="#4169E9" style={{ paddingRight: 10 }} />
            </GeneralHeaderButton>
            <GeneralHeaderText> CONFIGURAÇÕES </GeneralHeaderText>
            <GeneralHeaderButton onPress={this.volta}>
             <Icon name="keyboard-arrow-left" size={28} color="#FFF" style={{ paddingRight: 10 }} />
            </GeneralHeaderButton>
          </GeneralHeaderContainer>

          <GeneralImputContainer>
            <GeneralInputText
              autoCompleteType="off"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              placeholder="SERVIDOR"
              underlineColorAndroid="transparent"
              textAlign="center"
              value={servidor}
              onChangeText={textServidor => this.setState({ servidor: textServidor.toUpperCase() })}
            />

            <GeneralInputText
              autoCompleteType="off"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              placeholder="URL"
              underlineColorAndroid="transparent"
              textAlign="center"
              value={url}
              onChangeText={textUrl => this.setState({ url: textUrl.toUpperCase() })}
            />

            <GeneralButton onPress={this.salvar} style={{ marginBottom: 15 }}>
            { loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <GeneralButtonText>SALVAR</GeneralButtonText>
            ) }
            </GeneralButton>
          </GeneralImputContainer>
          <GeneralItemList
            data={servidores}
            keyExtractor={item => String(item.url)}
            renderItem={this.renderListItem}
          />
          <GeneralContainer />

        <Overlay
          isVisible={modalSenha}
          windowBackgroundColor="rgba(255, 255, 255, .65)"
          overlayBackgroundColor="#4040a1"
          width={screenWidth - 60}
          height="auto"
          borderRadius={5}
        >
          <GeneralHeaderModal>
            <GeneralHeaderText> SENHA DO DIA </GeneralHeaderText>
          </GeneralHeaderModal>
          <GeneralModalView>
          <GeneralInputText
            style={{ marginLeft: 15, marginRight: 15 }}
            autoCompleteType="off"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
            placeholder="SENHA DO DIA"
            underlineColorAndroid="transparent"
            textAlign="center"
            value={senha}
            onChangeText={textSenha => this.setState({ senha: textSenha.toUpperCase() })}
          />

          </GeneralModalView>
          <GeneralFooterContainer>
            <GeneralButtonFooter onPress={this.volta}>
              <Icon name="arrow-back" size={20} color="#FFF" />
            </GeneralButtonFooter>
            <GeneralButtonFooter onPress={this.validaSenha}>
              <Icon name="done" size={20} color="#FFF" />
            </GeneralButtonFooter>

          </GeneralFooterContainer>
        </Overlay>
        <Toast ref="toast" />
        </GeneralContainer>
      );
    }
}

export default Configuration;
