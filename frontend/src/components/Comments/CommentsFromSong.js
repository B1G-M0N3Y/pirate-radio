import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchComments } from '../../store/comments'
import './CommentsFromSong.css'

const CommentsFromSong = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const comments = useSelector(state => state.comments);

    useEffect(() => {
        dispatch(fetchComments(id));
    }, [dispatch, id])


    const gaming = Object.values(comments)

    return (
        <>
            <div>
                <h2>Comments:</h2>
                <ul>
                    {gaming?.map(comment => {
                        return <li key={comment.id}> {comment.body} </li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default CommentsFromSong;
