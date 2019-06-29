/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prefer-stateless-function */
import axios from 'axios';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config/ReactotronConfig';
import { Overlay } from 'react-native-elements';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Toast from 'react-native-easy-toast';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

import {
  Animated,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';


import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  DataText,
  ButtonData,
  Button,
  HeaderModal,
  SubHeader,
  HeaderText,
  SubHeaderText,
  ModalViewNotificacao,
  ItemLista,
  FooterContainer,
  ButtonFooter,
  ButtonFooterText,
  ButtonLista,
  ListContent,
  TextListContent,
  TitleList,
  HeaderContainer,
  CardFooter,
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


class Main extends Component {
  state = {
    usuario: {},
    servidor: {},
    token: null,
    dataBusca: moment().format('DD/MM/YYYY'),
    loading: true,
    loadingCard: false,
    grafico: {
      labels: [0],
      datasets: [{ data: [0], color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` }],
    },

  };

  async componentDidMount() {
    const usuario = JSON.parse(await AsyncStorage.getItem('@Solucom:usuario'));
    const servidor = JSON.parse(await AsyncStorage.getItem('@Solucom:server'));
    const token = await AsyncStorage.getItem('@Solucom:token');
    this.setState({ usuario, servidor, token });
    const diaBusca = moment().format('DD/MM/YYYY');
    this.buscaGrafico(diaBusca);
  }

  //= =========================================================================================================================

  async buscaGrafico(diaBusca) {
    this.setState({ loadingCard: true });
    const { servidor, token } = this.state;
    const body = { datainicial: diaBusca, datafinal: diaBusca };

    await axios
      .post(`${servidor.url}/forma`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        this.setState({ grafico: response.data });
        this.setState({ loadingCard: false });
      })
      .catch(() => {
        this.refs.toast.show('Erro na requisição ao servidor!');
        this.setState({ loadingCard: false });
      });
  }

  //= =========================================================================================================================

  dataSubtrai = () => {
    const { dataBusca } = this.state;
    const diaBusca = String(
      moment(dataBusca, 'DD/MM/YYYY')
        .subtract(1, 'days')
        .format('DD/MM/YYYY'),
    );
    this.setState({ dataBusca: diaBusca });
    this.buscaGrafico(diaBusca);
  };

  //= =========================================================================================================================

  dataSoma = () => {
    const { dataBusca } = this.state;
    const dia = moment();
    const data = moment(dataBusca, 'DD/MM/YYYY').add(1, 'days');

    if (data <= dia) {
      const diaBusca = String(moment(dataBusca, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY'));
      this.setState({ dataBusca: diaBusca });
      this.buscaGrafico(diaBusca);
    }
  }

  //= =========================================================================================================================

  render() {
    const {
      usuario, servidor, dataBusca, loadingCard, grafico,
    } = this.state;

    const chartConfig = {
      backgroundGradientFrom: '#FFF',
      backgroundGradientTo: '#fFF',
      color: (opacity = 0.6) => `rgba(35, 67, 152, ${opacity})`,
      strokeWidth: 3, // optional, default 3
    };

    //= ================================================
    let offset = 0;

    const screenWidth = Dimensions.get('window').width;

    const translateY = new Animated.Value(0);
    const animatedEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationY: translateY,
          },
        },
      ],
      { useNativeDriver: true },
    );

    function onHandlerStateChange(event) {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        let opened = false;
        const { translationY } = event.nativeEvent;

        offset += translationY;

        if (translationY >= 100) {
          opened = true;
        } else {
          translateY.setValue(offset);
          translateY.setOffset(0);
          offset = 0;
        }

        Animated.timing(translateY, {
          toValue: opened ? 380 : 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          offset = opened ? 380 : 0;
          translateY.setOffset(offset);
          translateY.setValue(0);
        });
      }
    }

    return (
      <GeneralContainer>
        <Header server={servidor.servidor} user={usuario.USU_NOME} />

        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 380],
                      outputRange: [-50, 0, 380],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            >
              <CardHeader>
                <ButtonData onPress={this.dataSubtrai}>
                  <Icon name="keyboard-arrow-left" size={28} color="#666" />
                </ButtonData>
                <DataText> {dataBusca} </DataText>
                <ButtonData onPress={this.dataSoma}>
                  <Icon name="keyboard-arrow-right" size={28} color="#666" />
                </ButtonData>
              </CardHeader>
              <CardContent>
                {loadingCard ? (
                  <ActivityIndicator size="large" color="#4040a1" />
                ) : (
                  <BarChart
                    style={{ marginLeft: 50 }}
                    data={grafico}
                    width={screenWidth - 120}
                    height={210}
                    yAxisLabel="$ "
                    fromZero
                    chartConfig={chartConfig}
                  />
                )}
              </CardContent>
              <CardFooter>
                <DataText> {dataBusca} </DataText>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
        <Toast ref="toast" />
      </GeneralContainer>
    );
  }
}
export default Main;
