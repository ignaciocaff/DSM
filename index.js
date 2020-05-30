/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AlbumList from './src/components/AlbumList';
import PhotoList from './src/components/PhotoList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
// Create a component
const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="albumList"
          component={AlbumList}
          options={{title: 'Albums'}}
        />
        <Stack.Screen
          name="photoList"
          component={PhotoList}
          options={{title: 'Photos'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => App);
