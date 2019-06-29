import React, { Component } from 'react';
import { StatusBar, YellowBox } from 'react-native';
import OneSignal from 'react-native-onesignal';
import CodePush from 'react-native-code-push';
import AsyncStorage from '@react-native-community/async-storage';

import createNavigator from '~/routes';

class App extends Component {
    state = {
      userChecked: false,
      userLogged: false,
    };

    constructor(props) {
      super(props);
      OneSignal.init('----');
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }

    async componentDidMount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.configure();
      OneSignal.addEventListener('ids', this.onIds);

      const usuario = await AsyncStorage.getItem('@Solucom:usuario');

      this.setState({
        userChecked: true,
        userLogged: !!usuario,
      });
    }

    onReceeived = (data) => {
      console.tron.log(data);
    };

    onOpened = (notification) => {
      console.tron.log(notification);
    };

    onIds = (id) => {
      AsyncStorage.setItem('@Solucom:idNotificacao', JSON.stringify(id.userId));
    };

    render() {
      YellowBox.ignoreWarnings([
        'Warning: Async Storage has been extracted from react-native core',
        'Warning: Failed prop type',
        'Warning: Encountered two children with the same key',
      ]); // <- insert the warning text here you wish to hide.

      const { userChecked, userLogged } = this.state;

      if (!userChecked) return null;

      const Routes = createNavigator(userLogged);
      return (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#4040a1" />
          <Routes />
        </>
      );
    }
}

export default CodePush({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME })(App);
