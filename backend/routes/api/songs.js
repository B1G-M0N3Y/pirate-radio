const express = require('express');

const { Song } = require('../../db/models')
const { restoreUser } = require('../../utils/auth')

const router = express.Router();

router.get(
    '/current',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const songs = await Song.findAll({
            where: {userId: user.toSafeObject().id}
        });
        return res.json({ songs });
    }
);

router.get(
    '/',
    async (req, res) => {
        const songs = await Song.findAll();
        return res.json({ songs });
    }
);

module.exports = router;
