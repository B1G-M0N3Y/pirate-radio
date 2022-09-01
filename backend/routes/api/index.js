// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs');
const albumsRouter = require('./albums');
const commentsRouter = require('./comments');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/comments', commentsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
