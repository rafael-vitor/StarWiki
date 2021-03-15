import React from 'react';

import { fireEvent, waitFor } from '@testing-library/react-native';

import CharacterList from '..';

import { withNavigationContextWrapper } from '../../../test/utils';
import StoreProvider from '../../../hooks/store';
import { useRoute } from '@react-navigation/core';
import { Text } from 'react-native';

jest.mock('axios', () => {
  const charactersMock = {
    next: 'https://swapi.dev/api/people/?page=2',
    results: [
      {
        name: 'Luke',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'api/url/1',
      },
      {
        name: 'C-3PO',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'api/url/2',
      },
    ],
  };

  return { get: () => Promise.resolve({ data: charactersMock }) };
});


function CharacterListWithContext() {
  return (
    <StoreProvider>
      <CharacterList />
    </StoreProvider>
  );
}

function FakeCharacterView() {
  const {
    params: { selectedCharacter },
  } = useRoute();

  return (
    <Text>Fake{selectedCharacter}</Text>
  )
}

describe('CharacterList', () => {
  test('should behave properly', async () => {
    const { queryByTestId, queryByText } = withNavigationContextWrapper(
      { comp: CharacterListWithContext }, { CharacterView: FakeCharacterView }
    );
    await waitFor(() => {
      expect(queryByTestId('Character_Luke')).not.toBeNull();
      expect(queryByTestId('Character_C-3PO')).not.toBeNull();

      fireEvent.press(queryByTestId('Character_Luke'));
      expect(queryByText('FakeLuke')).not.toBeNull();
    });
  });
});
