import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createNewComment } from "../../store/comments";
import { createNewSong } from "../../store/songs";

const CreateComment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [commentBody, setCommentBody] = useState("");
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentBody || commentBody.length > 500) {
      setValidationError("Your comment must be between 1 and 500 characters");
    } else {
      setValidationError('');
      const payload = {
        body: commentBody,
      };

      const comment = await dispatch(createNewComment(payload, id));

      if (comment) {
        history.push(`/songs/${id}`);
      }
      setCommentBody("");
      return comment;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {validationError.length > 1 && (
        <div className="errors">
          <p className="validation-error">{validationError}</p>
        </div>
      )}
      <label>
        Leave a Comment:
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CreateComment;
