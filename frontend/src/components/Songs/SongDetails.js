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
    const song = songs?.singleSong

    useEffect(() => {
        dispatch(fetchSongDetails(id))
    }, [dispatch,id]);

    console.log(id)
    console.log(song);

    return (
        <>
        <div>
            <h2>{song?.title}</h2>
            <img src = {song?.imageUrl} alt=""></img>
            <p>{song?.description}</p>
        </div>
        </>
    )
}

export default SongDetails;
