import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { deleteSingleSong, fetchSongDetails } from '../../store/songs';
import CommentsFromSong from '../Comments/CommentsFromSong';
import CreateComment from '../Comments/CreateComment';
import './SongDetails.css'

const SongDetails = () => {
    const dispatch = useDispatch();
    // const[showEditSong, setShowEditSong] = useState(false);
    // const[showDeleteSong, setShowDeleteSong] = useState(false);

    const { id } = useParams();
    const songs = useSelector(state => state.songs);
    const song = songs?.singleSong

    const deleteSong = async () => {
        await dispatch(deleteSingleSong(id))
    }

    useEffect(() => {
        dispatch(fetchSongDetails(id))
    }, [dispatch, id]);

    return (
        <>
            <div className='song-details'>
                <img src={song?.imageUrl} alt=""></img>
                <div className='name-n-desc'>
                    <h2 className='title'>{song?.title}</h2>
                    <p>{song?.description}</p>
                </div>
                <div className='crud-clickers'>
                    <Link to={`/songs/${id}/edit`}>
                        <button className='edit'>Edit Song</button>
                    </Link>
                    <Link to={`/songs/deleted`}>
                        <button className='delete' onClick={deleteSong}>Delete Song</button>
                    </Link>
                </div>
            </div>
            <hr></hr>
            <div>
                <CommentsFromSong />
                <CreateComment />
            </div>
        </>
    )
}

export default SongDetails;
