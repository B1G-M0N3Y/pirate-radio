import { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAudioDetails } from '../../store/audioPlayer';

const Player = () => {
    const dispatch = useDispatch();
    const audio = useSelector(state => state.audio.currentAudio);
    console.log('audio:', audio)

    return (
        <AudioPlayer
            autoPlay
            src={audio.url}
            onPlay={e => console.log("onPlay")}
        // other props here
        />
    )
};

export default Player;
