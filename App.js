import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRegister from './components/AppRegister';
import AppLogin from './components/AppLogin';
import AppUsers from './components/AppUsers';
import AppSnap from './components/AppSnap';
import AppCamera from './components/AppCamera';
import AppHome from './components/AppHome';
import AppSetting from './components/AppSetting';
import AppProfile from './components/AppProfile';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppHome} />
        <Stack.Screen name="Login" component={AppLogin} />
        <Stack.Screen name="Register" component={AppRegister} />
        <Stack.Screen name="Snap" component={AppSnap} />
        <Stack.Screen name="Contacts" component={AppUsers} />
        <Stack.Screen name="Camera" component={AppCamera} />
        <Stack.Screen name="Setting" component={AppSetting} />
        <Stack.Screen name="Profile" component={AppProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
