import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchSongs } from '../../store/songs';

const SongsIndex = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state => {
        return state.songs
    })

    useEffect(() => {
        dispatch(fetchSongs())
    }, [dispatch])

    console.log(Object.values(songs))

    return (
        <>
        <ul>
            {Object.values(songs).map( song =>{
                return <Link key = {song.id} to={`/songs/${song.id}`}>{song.title}</Link>
            })}
        </ul>
        </>
    )
}
export default SongsIndex;
