import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import './AudioBar.css'

const Player = () => {
    const dispatch = useDispatch();
    const audio = useSelector(state => state.audio.currentAudio);

    return (
        <div className='player-container'>
            <AudioPlayer
                autoPlay
                src={audio.url}
                // onPlay={e => console.log("onPlay")}
                // other props here
                className='player'
            />
        </div>
    )
};

export default Player;
