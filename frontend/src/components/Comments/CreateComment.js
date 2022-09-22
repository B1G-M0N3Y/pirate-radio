import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { createNewComment } from "../../store/comments";
import { createNewSong } from "../../store/songs";

const CreateComment = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const [commentBody, setCommentBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            body: commentBody
        }
        console.log(id)

        await dispatch (createNewComment(payload, id));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Leave a Comment:
                <textarea
                value = {commentBody}
                onChange = {(e) => setCommentBody(e.target.value)}>

                </textarea>
            </label>
            <button type='submit'>Post Comment</button>
        </form>
    )
}

export default CreateComment;
