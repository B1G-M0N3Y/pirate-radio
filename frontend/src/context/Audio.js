import { createContext, useState, useContext } from 'react';

export const CurrSongContext = createContext();

export default function CurrSongProvider(props) {
    const [ currSong, setCurrSong ] = useState({});
    const [ isPlaying, setIsPlaying ] = useState(false);

    return (
        <CurrSongContext.Provider
        value={{
            currSong,
            setCurrSong,
            isPlaying,
            setIsPlaying
        }}
        >
            {props.children}
        </CurrSongContext.Provider>
    )
}

export const useCurrSong = () => useContext(CurrSongContext);
