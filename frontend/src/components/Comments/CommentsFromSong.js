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


    const gaming = Object.values(comments);

    return (
        <>
            <div>
                <h2>Comments:</h2>
                <ul>
                    {gaming?.map(comment => {
                        return (
                            <div className='single-comment'>
                                <img key={comment.User.id} src={comment.User.imageUrl} ></img>
                                <div className='comment-text'>
                                    <p className='comment-username'>{comment.User.username}</p>
                                    <p className='comment-body' key={comment.id}> {comment.body} </p>
                                    <br/>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default CommentsFromSong;
