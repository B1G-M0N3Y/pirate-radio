const express = require('express');
// const { route } = require('express/lib/router');

const { Song, User, Album, Comment, Playlist, PlaylistSong, sequelize } = require('../../db/models')
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
        const playlists = await Playlist.findAll({
            where: { userId: user.toSafeObject().id }
        });
        return res.json({ playlists });
    }
);

router.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id;
        if (!(await Playlist.findByPk(id))) {
            res.status(404);
            return res.send({
                "message": "Playlist couldn't be found",
                "statusCode": 404
            });
        }
        const songIds = await PlaylistSong.findAll({
            attributes: ['songId'],
            where: { playlistId: id }
        });
        const ids = [];

        songIds.forEach(songId => {
            ids.push(songId.dataValues.songId)
        });

        const playlist = await Playlist.findByPk(id, {
            include: [{
                model: Song,
                where: {
                    id: ids
                }
            }]
        });


        return res.json(playlist);
    }
);

router.post(
    '/:id/songs',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const { songId } = req.body;
        const id = req.params.id;

        if (!(await Playlist.findByPk(id))) {
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

        const greatestVal = await PlaylistSong.max('order', { where: { playlistId: id } });
        const playlistSong = await PlaylistSong.create({
            songId,
            playlistId: id,
            order: greatestVal ? greatestVal + 1 : 1
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
        const playlist = await Playlist.findByPk(req.params.id);
        const { name, imageUrl } = req.body;

        if (!playlist) {
            res.status(404);
            res.send({
                "message": "Playlist couldn't be found",
                "statusCode": 404
            });
        }

        if (!name) {
            res.status(400);
            res.send({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "Name": "Playlist Name is required"
                }
            });
        }

        if (name) {
            playlist.update({ name })
        }
        if (imageUrl) {
            playlist.update({ imageUrl })
        }

        await playlist.save();

        res.json(playlist);
    }
);

router.delete(
    '/:id',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const playlist = await Playlist.findByPk(req.params.id);
        if (!playlist) {
            res.status(404);
            res.send({
                "message": "Playlist couldn't be found",
                "statusCode": 404
            });
        }

        if (playlist) {
            await playlist.destroy();

            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    }
)

module.exports = router;
