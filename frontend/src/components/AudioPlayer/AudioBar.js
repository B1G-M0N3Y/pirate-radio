import { useEffect } from "react";
import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { useCurrSong } from "../../context/Audio";
import "./AudioBar.css";

const Player = () => {
  const audio = useSelector((state) => state.audio.currentAudio);
  const player = useRef();
  const {setIsPlaying} = useCurrSong();
  let {setCurrSong} = useCurrSong();

  useEffect(()=>{
    setCurrSong(player);
  },[audio])

  return (
    <div className="player-container">
      <AudioPlayer
        ref={player}
        autoPlay
        src={audio.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        showSkipControls={false}
        showJumpControls={false}
        // other props here
        className="player"
      />
    </div>
  );
};

export default Player;
