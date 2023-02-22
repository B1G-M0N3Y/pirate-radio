// const { query } = require('express');
const express = require("express");
// const { json } = require('sequelize/types');
const {Sequelize} = require("sequelize");

const { Song, User, Album, Comment, Like } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth");

const router = express.Router();

router.post("/:id/likes",
  restoreUser,
  async (req, res) => {
    const id = req.params.id
    const { user } = req;

    if (!(await Song.findByPk(id))) {
      res.status(404);
      return res.send({
        message: "Song couldn't be found",
        statusCode: 404,
      });
    }

    const newLike = await Like.create({
      userId: user.toSafeObject().id,
      songId: Number(id)
    })

    res.status(200)
    return res.json(newLike);
  })

router.delete(
  "/:id/likes",
  restoreUser,
  async (req, res) => {
    const id = req.params.id
    const { user } = req;

    const like = await Like.findOne({where:{
      songId: id,
      userId: user.id
    }});

    if(like){
      await like.destroy();

      res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    }
  }
  );

  // router.get("/:id/likes", async (req, res) => {
    //   const id = req.params.id
    //   if (!(await Song.findByPk(id))) {
      //     res.status(404);
      //     return res.send({
        //       message: "Song couldn't be found",
        //       statusCode: 404,
        //     });
        //   }
        //   const likes = await Like.count(
          //     { where: { songId: id } }
          //   )
          //   return res.json({ likes })
          // })

          router.get("/:id/comments", async (req, res) => {
            const id = req.params.id;
            if (!(await Song.findByPk(id))) {
              res.status(404);
    return res.send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
  const comments = await Comment.findAll({
    where: { songId: id },
    include: [
      {
        model: User,
        attributes: ["id", "username", "imageUrl"],
      },
    ],
  });
  return res.json({ comments });
});


router.get("/count", async(req ,res) => {
  const count = await Song.count()
  
  return res.json(count)
})


router.get("/random", async(req, res) => {
  const songs = await Song.findAll({
    order: Sequelize.literal('random()'),
    limit: 6,
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imageUrl"],
      },
      {model: Like}
    ],
  })
  return res.json({ songs })
})


router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const songs = await Song.findAll({
    where: { userId: user.toSafeObject().id },
  });
  return res.json({ songs });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const song = await Song.findByPk(id, {
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imageUrl"],
      },
      {
        model: Album,
        attributes: ["id", "title", "imageUrl"],
      },
      {model: Like}
    ],
  });

  if (!song) {
    res.status(404);
    return res.send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }

  return res.json(song);
});


router.get("/", async (req, res) => {
  let { page, size, search } = req.query;

  if (page < 1 || size < 1) {
    res.status(400);
    return res.send({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        page: "Page must be greater than or equal to 0",
        size: "Size must be greater than or equal to 0",
        createdAt: "CreatedAt is invalid",
      },
    });
  }

  let pagination = {};
  let songs = {};
  const whereParams = {};

  if (search) {
    const title = { [Op.iLike]: `%${search}%` };
    whereParams.title = title;
  } else {
    if (!page) page = 1;
    if (!size) size = 12;
    if (page > 10) page = 10;
    if (size > 12) size = 12;
    pagination = { limit: size, offset: size * (page - 1) };
  }

  songs.Songs = await Song.findAll({
    ...pagination,
    where: whereParams,
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imageUrl"],
      },
      {model: Like}
    ],
  });

  if (!search) {
    songs.Page = Number(page);
    songs.Size = Number(size);
  }

  res.json(songs);
});

router.post("/:id/comments", restoreUser, async (req, res) => {
  const id = req.params.id;
  const { user } = req;
  const { body } = req.body;

  if (!body) {
    res.status(400);
    res.send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        body: "Comment body text is required",
      },
    });
  }
  if (!(await Song.findByPk(id))) {
    res.status(404);
    res.send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  } else {
    const newComment = await Comment.create({
      userId: user.toSafeObject().id,
      songId: Number(id),
      body,
    });

    res.json(newComment);
  }
});

router.post("/", restoreUser, async (req, res) => {
  const { user } = req;
  const { title, description, url, imageUrl, albumId } = req.body;
  if (!title || !url) {
    res.status(400);
    res.send({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
        url: "Audio is required",
      },
    });
  }
  if (albumId < 0 || albumId > (await Album.count())) {
    res.status(404);
    res.send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    const newSong = await Song.create({
      userId: user.toSafeObject().id,
      title,
      description,
      url,
      imageUrl,
      albumId,
    });
    res.status(201);
    res.json(newSong);
  }
});

router.put("/:id", restoreUser, async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  const { user } = req;
  const { title, description, url, imageUrl, albumId } = req.body;

  if (!song) {
    res.status(404);
    res.send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }

  if (song.userId !== user.toSafeObject().id) {
    res.status(403);
    res.send({
      message: "You must have created a song to edit it",
      statusCode: 403,
    });
  }

  if (title) {
    song.update({ title });
  }
  if (description) {
    song.update({ description });
  }
  if (url) {
    song.update({ url });
  }
  if (imageUrl) {
    song.update({ imageUrl });
  }
  if (albumId) {
    song.update({ albumId });
  }

  await song.save();

  res.json(song);
});

router.delete("/:id", restoreUser, async (req, res) => {
  const { user } = req;
  const song = await Song.findByPk(req.params.id);
  if (!song) {
    res.status(404);
    res.send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
  if (user.id !== song.userId) {
    res.status(403),
      res.send({
        message: "Nacho song buddy!",
        statusCode: 403,
      });
  }
  if (song) {
    await song.destroy();

    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
