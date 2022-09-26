import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editSong, fetchSongDetails } from "../../store/songs";

const SONG_EXTENSIONS = ['mp3', 'mp4', 'wav']

const EditSong = song => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState();
    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        dispatch(editSong(song))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = [];

        console.log(url)

        if (!(SONG_EXTENSIONS.includes(url.split('.').pop()))) {
            errors.push("Song url must link to valid")
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            const payload = { id: Number(id), title, description, url, imageUrl, albumId }
            let updatedSong = await dispatch(editSong(payload))
            if (updatedSong) {
                history.push(`/songs/${updatedSong.id}`)
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <h2>Edit Song:</h2>
            {validationErrors.length > 0 && (
                <ul className='errors'>
                    {validationErrors.map(error => <li key={error}>{error}</li>)}
                </ul>
            )}
            <label>
                Title
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Song Url
                <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
            <button type='submit'>Update Song</button>
        </form>
    )
}

export default EditSong;
