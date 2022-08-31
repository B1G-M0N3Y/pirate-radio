const express = require('express');

const { Song, User, Album, Comment } = require('../../db/models')
const { restoreUser } = require('../../utils/auth')

const router = express.Router();

router.get(
    '/current',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const albums = await Album.findAll({
            where: { userId: user.toSafeObject().id }
        });
        return res.json({ albums });
    }
);

router.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id;

        if (id <= 0 || id > await Album.count() ) {
            res.status(404);
            res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        } else {

            const albums = await Album.findByPk(id, {
                include: [{
                    model: User,
                    as: 'Artist',
                    attributes: ['id', 'username', 'imageUrl']
                },
                {
                    model: Song,
                    as: 'Songs'
                }]
            }
            );

            return res.json(albums)
        }
    }
)

router.get(
    '/',
    async (req, res) => {
        res.json(await Album.findAll());
    }
);

router.post('/',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const { title, description, imageUrl } = req.body;
        if (!title) {
            res.status(400);
            res.send({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Album title is required"
                }
            });
        } else {
            const newAlbum = await Album.create({
                userId: user.toSafeObject().id,
                title,
                description,
                imageUrl
            })

            res.json(newAlbum);
        }
    }
);

router.put('/:id',
    restoreUser,
    async (req, res) => {

    }
);

router.delete(
    '/:id',
    restoreUser,
    async (req, res) => {

    }
)

module.exports = router;
