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
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

type ParamList = {
  CharacterView: {selectedCharacter: string};
};

type CharacterViewRouteProp = RouteProp<ParamList, 'CharacterView'>;

import {Colors} from '../../../constants';
import {useStore} from '../../hooks/store';

const CharacterView = () => {
  const {charactersList, bookmarks, toggleBookmark} = useStore();
  const {
    params: {selectedCharacter},
  } = useRoute<CharacterViewRouteProp>();

  const character = charactersList.filter(
    (c) => c.name === selectedCharacter,
  )[0];

  const [films, setFilms] = useState<Array<{title: string}>>([]);
  const [loadingFilms, setLoadingFilms] = useState(false);

  const fetchFilms = async () => {
    setLoadingFilms(true);
    const results = await axios.all(character.films.map((f) => axios.get(f.replace('http', 'https'))));

    const filmsData = results.map((r) => r.data);

    setLoadingFilms(false);
    setFilms(filmsData);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const isBookmarked = bookmarks.includes(character.name);

  return (
    <View style={styles.body}>
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.info}>• Gender: {character.gender}</Text>
          <Text style={styles.info}>• Birth year: {character.birth_year}</Text>
          <Text style={styles.info}>• Height: {character.height}</Text>
          <Text style={styles.info}>• Mass: {character.mass}</Text>
          <Text style={styles.info}>• Hair color: {character.hair_color}</Text>
          <Text style={styles.info}>• Skin color: {character.skin_color}</Text>
          {!!loadingFilms && (
            <ActivityIndicator
              style={styles.loading}
              color={Colors.yellow}
              size="large"
            />
          )}
          {!!films.length && (
            <View>
              <Text style={styles.info}>• films:</Text>
              <View style={styles.filmsWrapper}>
                {films.map((f) => (
                  <Text key={f.title} style={styles.info}>- {f.title}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
        <TouchableOpacity
          testID="ToggleBookmark"
          onPress={() => toggleBookmark(character.name)}>
          <Text>
            <Icon
              testID="BookmarkIcon"
              name="stars"
              size={30}
              color={isBookmarked ? Colors.yellow : Colors.black}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.black,
    height: '100%',
    padding: 24,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  filmsWrapper: {
    paddingLeft: 16,
  },
  loading: {
    paddingTop: 40,
  },
});

export default CharacterView;
