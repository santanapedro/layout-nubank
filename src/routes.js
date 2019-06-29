import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Main from '~/pages/Main';
import Login from '~/pages/Login';
import Configuration from '~/pages/Configuration';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Login: {
        screen: Login,
      },
      Main: {
        screen: Main,
      },
      Configuration: {
        screen: Configuration,
      },
    },
    {
      initialRouteName: userLogged ? 'Main' : 'Login',
    },
  ),
);

export default Routes;
