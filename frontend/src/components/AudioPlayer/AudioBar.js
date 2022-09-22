import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Player = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentSongUrl, setCurrentSongUrl] = useState("");
    const songs = useSelector(state => state.songs);
    const song = songs?.singleSong;

    console.log('player song', song)

    return (
        <AudioPlayer
            autoPlay
            src={song?.url}
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    )
};

export default Player;
