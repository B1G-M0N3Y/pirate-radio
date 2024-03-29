// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name'),
  handleValidationErrors
];

// router.get(
//     '/',
//     async (req, res) => {
//         const users = await User.findAll();
//         return res.json({users});
//     }
// )

// Sign up
// router.post(
//     '/',
//     validateSignup,
//     async (req, res) => {
//         const { firstName, lastName, email, password, username } = req.body;
//         const user = await User.signup({ firstName, lastName, email, username, password });

//         await setTokenCookie(res, user);

//         return res.json(
//             user
//         );
//     }
// );

// Post /api/users ---Sign up
router.post(
  "/",
  singleMulterUpload("image"),
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    let profileImageUrl

    if (req.file) {
      profileImageUrl = await singlePublicFileUpload(req.file);
    }

    const user = await User.signup({
      username,
      email,
      password,
      firstName,
      lastName,
      imageUrl: profileImageUrl,
    });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

module.exports = router;
