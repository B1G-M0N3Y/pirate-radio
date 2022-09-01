const express = require('express');

const { Comment } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.put(
    '/:id',
    restoreUser,
    async (req, res) => {
        const comment = await Comment.findByPk(req.params.id);
        const { user } = req;
        const { body } = req.body;

        if (!body) {
            res.status(400);
            res.send({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "body": "Comment body text is required",
                }
            });
        }

        if (!comment) {
            res.status(404);
            res.send({
                "message": "Comment couldn't be found",
                "statusCode": 404
            });
        } else {
            comment.update({ body });
            await comment.save();
            res.json(comment);
        }
    }
);

router.delete(
    '/:id',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            res.status(404);
            res.send({
                "message": "Comment couldn't be found",
                "statusCode": 404
            });
        }
        if (user.id !== comment.userId) {
            res.status(403),
                res.send({
                    "message": "Nacho comment buddy!",
                    "statusCode": 403
                })
        }
        if (comment) {
            await comment.destroy();

            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }
)


module.exports = router;
