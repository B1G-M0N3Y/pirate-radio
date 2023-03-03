import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { loadCurrUserAlbums } from "../../../store/albums";
import { createNewSong } from "../../../store/songs";
import "./CreateSong.css";

const ALLOWED_TYPES = ["mp3", "mp4", "wav"];

const CreateSong = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [albumId, setAlbumId] = useState();
  const [position, setPosition] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);

  const albums = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(loadCurrUserAlbums());
  }, [dispatch])

  const handleSongUpload = (file) => {
    setSong(file)
    setPosition(1)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      albumId,
      songFile: song,
      image
    };
    const errors = [];

    if (title.length < 1) {
      errors.push("Song title is required");
    }
    if (description.length < 1) {
      errors.push("Description is required");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      let createdSong = await dispatch(createNewSong(payload));

      if (createdSong) {
        history.push(`/songs/${createdSong.id}`);
      }
    }
  };

  return (
    <div className="create-song">
      <h2 className="shanty-message">Sing us yer shanty ye land-lubber!</h2>
      <div className="create-song-carousel">
        <div className="create-song-inner" style={{ transform: `translateX(-${position * 100}%)` }}>
          <FileUploader
            label='Something Groovy'
            types={ALLOWED_TYPES}
            handleChange={handleSongUpload}
            children={
              <div className="song-drag-drop-upload">
                <h3 className="song-drag-drop-upload-title">Drag and drop your booty here</h3>
                <button className="song-drag-drop-button"> or choose files to upload </button>
                <p className="allowed-extensions">allowed file types: {ALLOWED_TYPES.map(type => (` .${type} `))}</p>
              </div>
            }
          />
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
              // required
              />
            </label>
            <label>
              Description
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              // required
              />
            </label>
            <label>
              Cover Image
              <input
                type="file"
                onChange={handleImageUpload}
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
                  <option value={album.id}>{album.title}</option>
                ))}
                <option> N/A </option>
              </select>
            </label>
            <button type="submit">Create Song</button>
          </form>
        </div>
      </div>
      <div id="yo-ho-box">
        <h2 id="yo-ho">
          YO HO, YO HO, A PIRATES LIFE FOR ME! YO HO, YO HO, A PIRATES LIFE FOR
          ME! YO HO, YO HO, A PIRATES LIFE FOR ME! YO HO, YO HO, A PIRATES LIFE
          FOR ME!
        </h2>
      </div>
    </div>
  );
};

export default CreateSong;
