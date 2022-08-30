const { query } = require('express');
const express = require('express');

const { Song, User, Album } = require('../../db/models')
const { restoreUser } = require('../../utils/auth')

const router = express.Router();

router.get(
    '/current',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const songs = await Song.findAll({
            where: { userId: user.toSafeObject().id }
        });
        return res.json({ songs });
    }
);

router.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id;
        if (id <= 0 || id > await Song.count()) {
            res.status(404);
            res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        } else {

            const songs = await Song.findByPk(id, {
                include: [{
                    model: User,
                    as: 'Artist',
                    attributes: ['id', 'username', 'imageUrl']
                },
                {
                    model: Album,
                    attributes: ['id', 'title', 'imageUrl']
                }]
            }
            );

            return res.json(songs)
        }
    }
)

router.get(
    '/',
    async (req, res) => {
        const songs = await Song.findAll();
        return res.json({ songs });
    }
);

router.post('/',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const { title, description, url, imageUrl, albumId } = req.body;
        if (!title || !url) {
            res.status(400);
            res.send({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Song title is required",
                    "url": "Audio is required"
                }
            });
        }
        if (albumId < 0 || albumId > await Album.count()) {
            res.status(404);
            res.send({
                "message": "Album couldn't be found",
                "statusCode": 404
            })
        } else {
            const newSong = await Song.create({
                userId: user.toSafeObject().id,
                title,
                description,
                url,
                imageUrl,
                albumId
            })

            res.json(newSong);
        }
    })

// router.put()
module.exports = router;
