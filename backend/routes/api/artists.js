const express = require('express');

const { Song, User, Album, Playlist } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

router.get(
    '/:id/playlists',
    async (req, res) => {
        const id = req.params.id;
        if (!(await User.findByPk(id))) {
            res.status(404);
            return res.send({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }
        const playlists = await Playlist.findAll({
            where: { userId: id }
        });

        res.json(playlists);
    }
)

router.get(
    '/:id/albums',
    async (req, res) => {
        const id = req.params.id;
        if (!(await User.findByPk(id))) {
            res.status(404);
            return res.send({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }

        const albums = await Album.findAll({
            where: { userId: id }
        });

        res.json(albums);
    }
)

router.get(
    '/:id/songs',
    async (req, res) => {
        const id = req.params.id;
        if (id <= 0 || id > await Song.count()) {
            res.status(404);
            return res.send({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        } else {
            const songs = await Song.findAll({
                where: { userId: id }
            });
            return res.json({ songs });
        }
    }
);

router.get(
    '/:id',
    async (req, res) => {
        const artist = await User.findByPk(req.params.id);

        if (!artist) {
            res.status(404);
            return res.send({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }

        return res.json(artist)
    }
)

module.exports = router;
