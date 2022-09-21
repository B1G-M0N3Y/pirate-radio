import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
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
    }, [dispatch, id]);

    console.log("id", id)
    console.log("song", song);

    return (
        <>
            <div>
                <h2>{song?.title}</h2>
                <img src={song?.imageUrl} alt=""></img>
                <p>{song?.description}</p>
                <Link to={`/songs/${id}/edit`}>
                    <button>Edit Song</button>
                </Link>
                <button>Delete Song</button>
            </div>
        </>
    )
}

export default SongDetails;
