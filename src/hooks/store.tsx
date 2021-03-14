import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import axios from 'axios';

type StoreContext = {
  charactersList: Array<Character>;
  fetchCharacters: () => void;
};

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

export const StoreContext = createContext<StoreContext>({
  charactersList: [],
  fetchCharacters: () => {},
});

export default function StoreProvider(props: PropsWithChildren<{}>) {
  const [charactersList, setCharactersList] = useState<Array<Character>>([]);
  const [nextPageUrl, setNextPageUrl] = useState(
    'https://swapi.dev/api/people/?page=1',
  );

  const fetchCharacters = async () => {
    const {data} = await axios.get(nextPageUrl);
    const {results, next} = data;

    setNextPageUrl(next);
    setCharactersList([...charactersList, ...results]);
  };

  const storeContext = {
    charactersList,
    fetchCharacters,
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
