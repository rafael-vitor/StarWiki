import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import axios from 'axios';

export type Character = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: Array<string>;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: Array<string>;
  starships: Array<string>;
  url: string;
  vehicles: Array<string>;
};

type StoreContext = {
  charactersList: Array<Character>;
  bookmarks: Array<string>;
  fetchCharacters: () => void;
  toggleBookmark: (selected: string) => void;
};

export const StoreContext = createContext<StoreContext>({
  charactersList: [],
  bookmarks: [],
  fetchCharacters: () => {},
  toggleBookmark: () => {},
});

export default function StoreProvider(props: PropsWithChildren<{}>) {
  const [charactersList, setCharactersList] = useState<Array<Character>>([]);
  const [bookmarks, setBookmarks] = useState<Array<string>>([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    'https://swapi.dev/api/people/?page=1',
  );

  const toggleBookmark = (selected: string) => {
    if (bookmarks.includes(selected)) {
      setBookmarks(bookmarks.filter(i => i !== selected));
    } else {
      setBookmarks([...bookmarks, selected])
    }
  }

  const fetchCharacters = async () => {
    const {data} = await axios.get(nextPageUrl);
    const {results, next} = data;

    setNextPageUrl(next.replace('http', 'https'));
    setCharactersList([...charactersList, ...results]);
  };

  const storeContext = {
    charactersList,
    fetchCharacters,
    bookmarks,
    toggleBookmark,
  };

  return (
    <StoreContext.Provider value={storeContext}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
