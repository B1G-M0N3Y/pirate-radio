import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteSingleSong, fetchSongDetails } from "../../store/songs";
import PlayPause from "../AudioPlayer/PlayPause";
import CommentsFromSong from "../Comments/CommentsFromSong";
import CreateComment from "../Comments/CreateComment";
import "./SongDetails.css";

const SongDetails = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.session.user;
  });
  // const[showEditSong, setShowEditSong] = useState(false);
  // const[showDeleteSong, setShowDeleteSong] = useState(false);

  const { id } = useParams();
  const song = useSelector((state) => state.songs.singleSong);
  // const song = songs?.singleSong

  const deleteSong = async () => {
    await dispatch(deleteSingleSong(id));
  };

  useEffect(() => {
    dispatch(fetchSongDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="song-details">
        <div className="details-left">
          <PlayPause id={id} styling={"details-play"} />
          <div className="name-n-desc">
            <h2 className="title">{song?.title}</h2>
            <p>{song?.description}</p>
          </div>
        </div>
        <img className="song-pic-details" src={song?.imageUrl} alt=""></img>
      </div>
      <div className="crud-clickers">
        <Link to={`/songs/${id}/edit`}>
          <button className="edit" hidden={!(user?.id === song?.userId)}>
            Edit Song
          </button>
        </Link>
        <Link to={`/songs/deleted`}>
          <button
            className="delete"
            hidden={!(user?.id === song?.userId)}
            onClick={deleteSong}
          >
            Delete Song
          </button>
        </Link>
      </div>
      <hr></hr>
      <div className="likes-section">
        {song?.Likes.length}
      </div>
      <div className="comment-section">
        <h2>Comments:</h2>
        {user?.id && <CreateComment />}
        {/* <CreateComment /> */}
        <CommentsFromSong className="all-comments" />
      </div>
    </>
  );
};

export default SongDetails;
