/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {useRoute, RouteProp} from '@react-navigation/native';

type ParamList = {
  CharacterView: {selectedIndex: number};
};

type CharacterViewRouteProp = RouteProp<ParamList, 'CharacterView'>;

import {Colors} from '../../constants';
import {useStore} from '../hooks/store';

const CharacterView = () => {
  const {charactersList} = useStore();
  const {
    params: {selectedIndex},
  } = useRoute<CharacterViewRouteProp>();

  const character = charactersList[selectedIndex];

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.info}>Gender: {character.gender}</Text>
        {/* <Text style={styles.info}>Homeworld: {character.homeworld}</Text> */}
        <Text style={styles.info}>Birth year: {character.birth_year}</Text>
        <Text style={styles.info}>Height: {character.height}</Text>
        <Text style={styles.info}>Mass: {character.mass}</Text>
        <Text style={styles.info}>Hair color: {character.hair_color}</Text>
        <Text style={styles.info}>Skin color: {character.skin_color}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.black,
    height: '100%',
    padding: 24,
  },
  wrapper: {
    backgroundColor: Colors.grey,
    minHeight: '90%',
    borderRadius: 6,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.yellow,
  },
  info: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.yellow,
  },
});

export default CharacterView;
