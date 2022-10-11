import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import songReducer, { createNewSong } from "../../store/songs";
import './CreateSong.css'

const SONG_EXTENSIONS = ['mp3', 'mp4', 'wav']

const CreateSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState();
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title, description, url, imageUrl, albumId
        };
        const errors = []

        if (title.length < 1) {
            errors.push("Song title is required");
        }
        if (description.length < 1) {
            errors.push("Description is required");
        }

        if (!(SONG_EXTENSIONS.includes(url.split('.').pop()))) {
            errors.push("Song url must link to valid")
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            let createdSong = await dispatch(createNewSong(payload))

            if (createdSong) {
                history.push(`/songs/${createdSong.id}`);
            }
        }
    }

    return (
        <div className='create-song'>
            <h2 className="shanty-message">Sing us yer shanty ye land-lubber!</h2>
            <form className='song-form'
                onSubmit={handleSubmit}>
                {validationErrors.length > 0 && (
                    <div className='errors'>
                        {validationErrors.map(error => <p className="validation-error"
                            key={error}>{error}</p>)}
                    </div>
                )}
                <label>
                    Title
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    Description
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    Song Url
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    // required
                    />
                </label>
                <label>
                    Image Url
                    <input
                        type='text'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                <label>
                    Album id
                    <input
                        type='text'
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                    />
                </label>
                <button type='submit'>Create Song</button>
            </form>
            <div id="yo-ho-box">
                <h2 id="yo-ho">YO HO, YO HO, A PIRATES LIFE FOR ME! YO HO, YO HO, A PIRATES LIFE FOR ME! YO HO, YO HO, A PIRATES LIFE FOR ME! YO HO, YO HO, A PIRATES LIFE FOR ME! </h2>
            </div>
        </div>
    )
}

export default CreateSong;
