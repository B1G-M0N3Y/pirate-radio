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
