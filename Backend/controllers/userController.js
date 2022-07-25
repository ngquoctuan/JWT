const User = require("../models/model");
const bcrypt = require('bcrypt');


const userController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                name: req.body.name,
                birthday: req.body.birthday,
                gender: req.body.gender
            });

            //Save user to DB
            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err) {
            res.status(404).json(err);

        }
    },
    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).json("Wrong username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                res.status(404).json("Wrong password");
            }
            if (user && validPassword) {
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET A USER
    getAUser: async (req, res) => {
        try {
            const aUser = await User.findById(req.params.id);
            res.status(200).json(aUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE A USER
    updateUser: async (req, res) => {
        try {
            const aUser = await User.findById(req.params.id);
            await aUser.updateOne({ $set: req.body });
            res.status(200).json("Updated Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE A USER
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    }

};

module.exports = userController;