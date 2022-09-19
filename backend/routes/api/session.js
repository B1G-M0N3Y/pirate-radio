// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
// Log in
router.post(
    '/',
    async (req, res, next) => {
        const { credential, password } = req.body;

        if(!credential || !password){
            res.status(400);
            return res.json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                  "credential": "Email or username is required",
                  "password": "Password is required"
                }
              });
        }

        const user = await User.login({ credential, password });

        if (!user) {
            res.status(401);
            return res.json({
                "message": "Invalid credentials",
                "statusCode": 401
              })
        }

        await setTokenCookie(res, user);

        return res.json(user);
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        console.log(user)
        if (user) {
            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            }
            );
        } else return res.json({});
    }
);

module.exports = router;
