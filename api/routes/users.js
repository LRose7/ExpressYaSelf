const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Load User model
const User = require('../models/User');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
    // see if email already exists
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already Exists' });
        } else {
            // create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

            // generate new password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        // check for user
        if (!user) {
            return res.status(404).json({ email: 'User not found' });
        }

        // check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // user matched
                const payload = { id: user.id, email: user.email } // create JWT payload

                // sign token
                jwt.sign(
                    payload,
                    process.env.SECRET,
                    { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }); // 3600 = 1hr
            } else {
                return res.status(400).json({ password: 'Password Incorrect' });
            }
        });
    });
});

// @route   GET api/users/current
// @desc    Return current user 
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
    });
});


// update user
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json('Account has been updated');
        } catch (error) {
            return res.status(500).json(error);
        }

    } else { 
        return res.status(403).json('You can only update your account!');
    }
    
});

// delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json('Account has been deleted');
        } catch (error) {
            return res.status(500).json(error);
        }

    } else { 
        return res.status(403).json('You can only delete your account!');
    }
    
});

// get a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({ username:username });
        const { password, updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
    }
});

// get friends
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const {_id, username, profilePicture} = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// follow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json('User has been followed');
            } else {
                res.status(403).json('You already follow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You cant follow yourself');
    }
});

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json('User has been unfollowed');
            } else {
                res.status(403).json('You already unfollowed this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You cant unfollow yourself');
    }
});

module.exports = router;