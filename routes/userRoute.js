const express = require("express");
const router = require("express").Router();
const User = require("../models/User");





router.post("/userpost", async (req, res) => {

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password

    })

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET :Fetch all users

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: 'Error fetching users', err }));

})

//Get User By ID

router.get("/:id", async (req, res) => {

    try {
        const OneUser = await User.findById(req.params.id);
        res.status(200).json(OneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE User

router.delete("/:id", async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted....");
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update User

router.put("/:id", async (req, res) => {

    try {
        const UpdatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(201).json(UpdatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

    module.exports = router;