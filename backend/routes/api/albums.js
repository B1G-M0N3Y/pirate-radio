const express = require('express');

const { Song, User, Album } = require('../../db/models')
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

        if (id <= 0 || id > await Album.count()) {
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
        const album = await Album.findByPk(req.params.id);
        const { user } = req;
        const { title, description, imageUrl} = req.body;

        if (!album) {
            res.status(404);
            res.send({
                "message": "Album couldn't be found",
                "statusCode": 404
            });
        }

        if (!title) {
            res.status(400);
            res.send({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Album title is required"
                }
            });
        }

        if (album.userId !== user.toSafeObject().id) {
            res.status(403);
            res.send({
                "message": "You must have created a song to edit it",
                "statusCode": 403,
            });
        }

        if (title) {
            album.update({ title })
        }
        if (description) {
            album.update({ description })
        }
        if (imageUrl) {
            album.update({ imageUrl })
        }


        await album.save();

        res.json(album);
    }
);

router.delete(
    '/:id',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const album = await Album.findByPk(req.params.id);
        if(!album){
            res.status(404);
            res.send({
                "message": "Album couldn't be found",
                "statusCode": 404
              });
        }
        if(user.id !== album.userId){
            res.status(403),
            res.send({
                "message": "Nacho album buddy!",
                "statusCode": 403
            })
        }
        if(album){
            await album.destroy();

            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }
)

module.exports = router;
