/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import CharacterList from './src/screens/CharacterList';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <CharacterList />
    </>
  )
};

export default App;
