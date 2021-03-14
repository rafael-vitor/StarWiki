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
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { Colors } from '../../constants';

const CharacterList = () => {
  const [characters, setCharacters] = useState([])

  const fetchData = async () => {
    const result = await axios.get('https://swapi.dev/api/people/?page=1')
    const { data } = result;
    console.log(data.results);
    setCharacters(data.results);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>STAR WIKI</Text>
        <Text style={styles.description}>
          Your StarWars info database.
        </Text>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {characters.map((c: any) => ( //TODO: type
          <View style={styles.characterCard}>
            <Text style={styles.characterCardTitle}>{c.name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.black,
    height: '100%',
    padding: 24,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterCard: {
    marginTop: 32,
    padding: 16,
    borderRadius: 6,
    backgroundColor: Colors.grey,
  },
  characterCardTitle: {
    fontSize: 20,
    color: Colors.yellow,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.yellow,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.yellow,
  },
});

export default CharacterList;
