const express = require('express');
// const { route } = require('express/lib/router');

const { Song, User, Album, Comment, Playlist, PlaylistSong } = require('../../db/models')
const { restoreUser } = require('../../utils/auth')

const router = express.Router();

router.get(
    '/:id/comments',
    async (req, res) => {
        const comments = await Comment.findAll({
            where: { songId: req.params.id },
            include: [{
                model: User,
                attributes: ['id', 'username']
            }]
        });
        return res.json({ comments });
    }
)

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
        return res.json(await Song.findAll());
    }
);

router.post(
    '/:id/songs',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const { songId } = req.body;
        const id = req.params.id;

        if(!(await Playlist.findByPk(id))){
            res.status(404);
            return res.send({
                "message": "Playlist couldn't be found",
                "statusCode": 404
            });
        }

        if (!(await Song.findByPk(songId))) {
            res.status(404);
            return res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        }

        const greatestVal = await PlaylistSong.max('order', { where: {playlistId: id}});

        const playlistSong = await PlaylistSong.create({
            songId,
            playlistId: id,
            order: greatestVal ? greatestVal.order + 1 : 1
        });

        res.json(playlistSong);
    })

router.post('/',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const { name, imageUrl } = req.body;
        if (!name) {
            res.status(400);
            return res.send({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "name": "Playlist name is required"
                }
            });
        }

        const newPlaylist = await Playlist.create({
            userId: user.id,
            name,
            imageUrl
        });

        res.status(201);
        res.json(newPlaylist);
    }
);

router.put('/:id',
    restoreUser,
    async (req, res) => {
        const song = await Song.findByPk(req.params.id);
        const { user } = req;
        const { title, description, url, imageUrl, albumId } = req.body;

        if (!song) {
            res.status(404);
            res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        }

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

        if (song.userId !== user.toSafeObject().id) {
            res.status(403);
            res.send({
                "message": "You must have created a song to edit it",
                "statusCode": 403,
            });
        }

        if (title) {
            song.update({ title })
        }
        if (description) {
            song.update({ description })
        }
        if (url) {
            song.update({ url })
        }
        if (imageUrl) {
            song.update({ imageUrl })
        }
        if (albumId) {
            song.update({ albumId })
        }

        await song.save();

        res.json(song);
    }
);

router.delete(
    '/:id',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const song = await Song.findByPk(req.params.id);
        if (!song) {
            res.status(404);
            res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        }
        if (user.id !== song.userId) {
            res.status(403),
                res.send({
                    "message": "Nacho song buddy!",
                    "statusCode": 403
                })
        }
        if (song) {
            await song.destroy();

            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }
)

module.exports = router;
