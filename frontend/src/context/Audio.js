import { createContext, useState, useContext } from 'react';

export const CurrSongContext = createContext();

export default function CurrSongProvider(props) {
    const [ currSong, setCurrSong ] = useState({});

    return (
        <CurrSongContext.Provider
        value={{
            currSong,
            setCurrSong
        }}
        >
            {props.children}
        </CurrSongContext.Provider>
    )
}

export const useCurrSong = () => useContext(CurrSongContext);
