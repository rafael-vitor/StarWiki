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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Colors = {
  yellow: '#FFEF5C',
  black: '#1f1f1f',
  grey: '#534c57',
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>STAR WIKI</Text>
          <Text style={styles.description}>
            Your StarWars info database.
          </Text>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.characterCard}>
            <Text style={styles.characterCardTitle}>Luke Skywalker</Text>
          </View>
          <View style={styles.characterCard}>
            <Text style={styles.characterCardTitle}>Leia Skywalker</Text>
          </View>
          <View style={styles.characterCard}>
            <Text style={styles.characterCardTitle}>Han Solo</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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

export default App;
