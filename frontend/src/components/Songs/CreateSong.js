import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { createNewSong } from "../../store/songs";

const CreateSong = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title, description, url, imageUrl, albumId
        };

        let createdSong = await dispatch(createNewSong(payload));

        if (createdSong) {
            history.push(`/songs/${createdSong.id}`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                Description
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Song Url
                <input
                    type='text'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
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
    )
}

export default CreateSong;
