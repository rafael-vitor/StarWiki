/**
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {render} from '@testing-library/react-native';

const Stack = createStackNavigator();

export function withNavigationContextWrapper({ comp: Component, initialParams }, screens = {}) {
  const compName = Component.name || 'Component';

  function AppStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name={compName} initialParams={initialParams} component={Component} />
        {Object.keys(screens).map((name) => (
          <Stack.Screen key={name} name={name} component={screens[name]} />
        ))}
      </Stack.Navigator>
    );
  }

  return {
    ...render(
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>,
    ),
  };
}
