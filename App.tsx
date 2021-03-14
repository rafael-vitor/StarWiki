/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StoreProvider from './src/hooks/store';

import CharacterList from './src/screens/CharacterList';
import CharacterView from './src/screens/CharacterView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CharacterList"
            component={CharacterList}
            options={{headerShown: false}}
          />
          <Stack.Screen name="CharacterView" component={CharacterView} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
