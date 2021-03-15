import React from 'react';

import { fireEvent, waitFor } from '@testing-library/react-native';

import CharacterView from '..';

import { withNavigationContextWrapper } from '../../../test/utils';
import { StoreContext } from '../../../hooks/store';
import { Colors } from '../../../../constants';

const mockFilms = [
  {
    data: { title: 'film title 1' }
  },
  {
    data: { title: 'film title 2' }
  },
];

jest.mock('axios', () => {
  return {
    get: () => Promise.resolve(mockFilms),
    all: () => Promise.resolve(mockFilms),
  };
});

const storeContextMock = {
  charactersList: [
    {
      name: 'Luke',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      films: ['api/film/1', 'api/film/2'],
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
    },
  ],
  fetchCharacters: () => { },
  bookmarks: ['Leia'],
  toggleBookmark: jest.fn(),
}

function CharacterViewWithContext(props) {
  return (
    <StoreContext.Provider value={{ ...storeContextMock, ...props }}>
      <CharacterView />
    </StoreContext.Provider>
  );
}

describe('CharacterView', () => {
  test('should render properly', async () => {
    const { getByTestId, getByText } = withNavigationContextWrapper(
      { comp: CharacterViewWithContext, initialParams: { selectedCharacter: 'Luke' } }
    );

    await waitFor(() => {
      const buildRegex = (str) => new RegExp(str, 'i');
      const lukeRegex = buildRegex(storeContextMock.charactersList[0]).name;

      const character = storeContextMock.charactersList[0];

      expect(getByText(buildRegex(character.name))).not.toBeNull();
      expect(getByText(buildRegex(character.gender))).not.toBeNull();
      expect(getByText(buildRegex(character.birth_year))).not.toBeNull();
      expect(getByText(buildRegex(character.height))).not.toBeNull();
      expect(getByText(buildRegex(character.hair_color))).not.toBeNull();
      expect(getByText(buildRegex(character.skin_color))).not.toBeNull();
      expect(getByText(buildRegex(character.mass))).not.toBeNull();

      expect(getByText(buildRegex(mockFilms[0].data.title))).not.toBeNull();
      expect(getByText(buildRegex(mockFilms[1].data.title))).not.toBeNull();

      expect(getByTestId('BookmarkIcon')).toHaveStyle({ color: Colors.black });
    });
  });
  test('should render bookmark properly', async () => {
    const { getByTestId } = withNavigationContextWrapper(
      { comp: () => <CharacterViewWithContext bookmarks={['Luke']} />, initialParams: { selectedCharacter: 'Luke' } }
    );

    await waitFor(() => {
      expect(getByTestId('BookmarkIcon')).toHaveStyle({ color: Colors.yellow });
    });
  });
  test('should behave properly', async () => {
    const { getByTestId } = withNavigationContextWrapper(
      { comp: CharacterViewWithContext, initialParams: { selectedCharacter: 'Luke' } }
    );

    await waitFor(() => {
      expect(storeContextMock.toggleBookmark).toHaveBeenCalledTimes(0);
      fireEvent.press(getByTestId('ToggleBookmark'));
      expect(storeContextMock.toggleBookmark).toHaveBeenCalledTimes(1);
    });
  });
});
