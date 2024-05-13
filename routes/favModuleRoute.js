const express = require("express");
const router = require("express").Router();
const FavModule = require('../models/favModule');




//Create FavModule



router.post("/favmodulepost", async (req, res) => {


    try {
        const newFavourite = new FavModule(req.body);
    await newFavourite.save();
    res.status(201).json(newFavourite);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});



//GET :Fetch all FavModules

router.get('/', async (req, res) => {
    try {
        const favourites = await FavModule.find({ user: req.params.userId });
        res.json(favourites);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error fetching FavModule' });

    }
});



//DELETE FavModule

router.delete("/:id", async (req, res) => {

    try {
        await FavModule.findByIdAndDelete(req.params.id);
        res.status(200).json("FavModule has been deleted....");
    } catch (err) {
        res.status(500).json(err);
    }
});



//Get FavModule By ID

router.get("/:id", async (req, res) => {

    try {
        const OneFavModule = await FavModule.findById(req.params.id);
        if (!FavModule)
            return res.status(404).send({ message: 'FavModule not found' });

        res.json(OneFavModule);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching FavModule' })
    }
});


//Update FavModule

router.put("/:id", async (req, res) => {

    try {
        const UpdatedFavModule = await FavModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!FavModule) {
            return res.status(404).send({ message: 'FavModule not found' });
        }

        res.json(UpdatedFavModule);
    } catch (err) {
        res.status(500).send({ message: 'Error Updating FavModule' })
    }
});


module.exports = router;