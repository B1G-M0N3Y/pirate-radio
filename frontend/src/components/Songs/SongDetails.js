import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSongDetails } from '../../store/songs';

const SongDetails = () => {
    const dispatch = useDispatch();
    // const[showEditSong, setShowEditSong] = useState(false);
    // const[showDeleteSong, setShowDeleteSong] = useState(false);


    const { id } = useParams();
    const songs = useSelector(state => state.songs);
    const buttcheeks = songs?.[id]

    useEffect(() => {
        dispatch(fetchSongDetails(id))
    }, [dispatch,id]);

    console.log(id)
    // console.log(song);

    return (
        <>
        <div>
            <h2>{buttcheeks?.title}</h2>
            <img src = {buttcheeks?.imageUrl} alt=""></img>
            <p>{buttcheeks?.description}</p>
        </div>
        </>
    )
}

export default SongDetails;
