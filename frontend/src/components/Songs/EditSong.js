import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { loadCurrUserAlbums } from "../../store/albums";
import { editSong, fetchSongDetails } from "../../store/songs";
import "./EditSong.css";

const SONG_EXTENSIONS = ["mp3", "mp4", "wav"];

const EditSong = (song) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const albums = useSelector((state) => state.albums);
  // const song = useSelector((state)=> state.song[id])
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumId, setAlbumId] = useState();
  const [validationErrors, setValidationErrors] = useState([]);

  console.log('hhhhh',song)

  useEffect(() => {
    dispatch(editSong(song));
    dispatch(loadCurrUserAlbums())
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];

    if (!SONG_EXTENSIONS.includes(url.split(".").pop())) {
      errors.push("Song url must link to valid");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      const payload = {
        id: Number(id),
        title,
        description,
        url,
        imageUrl,
        albumId,
      };
      let updatedSong = await dispatch(editSong(payload));
      if (updatedSong) {
        history.push(`/songs/${updatedSong.id}`);
      }
    }
  };

  return (
    <div className="edit-song">
      <h2 id="edit-song-label">Edit Song:</h2>
      <form className="song-form" onSubmit={handleSubmit}>
        {validationErrors.length > 0 && (
          <div className="errors">
            {validationErrors.map((error) => (
              <p className="validation-error" key={error}>
                {error}
              </p>
            ))}
          </div>
        )}
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Song Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Image Url
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Album
          <select
            className="album-select"
            disabled={Object.values(albums).length === 0}
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            {Object.values(albums).map((album) => (
              <option value = {album.id}>{album.title}</option>
            ))}
            <option> N/A </option>
          </select>
        </label>
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
};

export default EditSong;
