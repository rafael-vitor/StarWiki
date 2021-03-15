/**
 * @format
 */

import React, {useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../../../constants';
import {useStore} from '../../hooks/store';
import {Character} from '../../hooks/store';

const CharacterList = () => {
  const {charactersList, fetchCharacters, bookmarks} = useStore();

  const {navigate} = useNavigation();

  useEffect(() => {
    fetchCharacters()
  }, []);

  const orderedByBookmarked = useMemo(
    () => [
      ...charactersList.filter((c: Character) => bookmarks.includes(c.name)),
      ...charactersList.filter((c: Character) => !bookmarks.includes(c.name)),
    ],
    [charactersList, bookmarks],
  );

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>STAR WIKI</Text>
        <Text style={styles.description}>Your StarWars info database.</Text>
      </View>
      <FlatList
        data={orderedByBookmarked}
        onEndReached={fetchCharacters}
        onEndReachedThreshold={0.2}
        keyExtractor={(item) => item.url}
        ListFooterComponent={() => (
          <ActivityIndicator
            style={styles.loading}
            color={Colors.yellow}
            size="large"
          />
        )}
        renderItem={({item}) => (
          <TouchableOpacity
            testID={`Character_${item.name}`}
            style={styles.characterCard}
            onPress={() => {
              navigate('CharacterView', {selectedCharacter: item.name});
            }}>
            <Text style={styles.characterCardTitle}>{item.name}</Text>
            <Icon
              name="stars"
              size={30}
              color={
                bookmarks.includes(item.name) ? Colors.yellow : Colors.black
              }
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.black,
    height: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  loading: {
    marginTop: 16,
    marginBottom: 24,
  },
});

export default CharacterList;
