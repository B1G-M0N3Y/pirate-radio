import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
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
  const { id } = useParams();
  const song = useSelector((state) => state.songs.singleSong);

  // Manages if current user has liked this song on initialization
  const isLiked = (likes) => {
    for (let i = 0; i < likes?.length; i++) {
      if (likes[i].userId === user?.id) {
        return true
      }
    }
    return false
  }
  const [userLikesThis, setUserLikesThis] = useState();

  const deleteSong = async () => {
    await dispatch(deleteSingleSong(id));
  };

  const like = async () => {

    if (!userLikesThis) {
      await csrfFetch(`/api/songs/${id}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setUserLikesThis(!userLikesThis)
      dispatch(fetchSongDetails(id));
    } else {
      await csrfFetch(`/api/songs/${id}/likes`, {
        method: 'DELETE'
      });
      setUserLikesThis(!userLikesThis)
      dispatch(fetchSongDetails(id));
    }
  }

  useEffect(() => {
    dispatch(fetchSongDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setUserLikesThis(isLiked(song?.Likes));
  }, [dispatch, id, isLiked])

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
      <div className="comment-section">
        <div className="likes-section">
          {user?.id &&
            <button onClick={like} className={`like-${userLikesThis}`}>
              <i class="fa-solid fa-heart" ></i>
            </button>
          }
          {!user?.id &&
            <i class="fa-solid fa-heart like-logged-out" ></i>
          }
          {song?.Likes?.length}
        </div>
        <h2>Comments:</h2>
        {user?.id && <CreateComment />}
        <CommentsFromSong className="all-comments" />
      </div>
    </>
  );
};

export default SongDetails;
