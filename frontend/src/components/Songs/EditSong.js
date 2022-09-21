import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";

const EditSong = song => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState();

    useEffect(() => {
        dispatch(editSong(song))
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { id: Number(id), title, description, url, imageUrl, albumId }
        console.log(payload)
        let updatedSong = await dispatch(editSong(payload))
        if (updatedSong) {
            history.push(`/songs/${updatedSong.id}`)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <h2>Edit Song:</h2>
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
            <button type='submit'>Update Song</button>
        </form>
    )
}

export default EditSong;
