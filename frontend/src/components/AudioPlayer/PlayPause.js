import { useCurrSong } from "../../context/Audio";
import { useDispatch, useSelector } from "react-redux";
import { fetchAudioDetails } from "../../store/audioPlayer";

const [PLAY_ICON, PAUSE_ICON] = [
  "https://res.cloudinary.com/dy199z8qt/image/upload/v1663887398/songplay_tb28tn.png",
  "https://res.cloudinary.com/dy199z8qt/image/upload/v1665680954/Eo_circle_deep-orange_pause.svg_zancav.png",
];

const PlayPause = ({ id, styling }) => {
  const dispatch = useDispatch();
  let { currSong, isPlaying } = useCurrSong();
  let player = document.querySelector(".player");
  const audio = useSelector((state) => state.audio.currentAudio);

  const playPause = async () => {
    if (player.classList.value.includes("rhap_play-status--playing")) {
      currSong.current.audio.current.pause();
    } else {
      currSong.current.audio.current.play();
    }
    await dispatch(fetchAudioDetails(id));
  };

  return (
    <div className={styling}>
      <img
        src={isPlaying && audio.id === Number(id) ? PAUSE_ICON : PLAY_ICON}
        onClick={() => playPause()}
      />
    </div>
  );
};

export default PlayPause;
