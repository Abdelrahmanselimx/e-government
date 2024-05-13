const express = require("express");
const router = require("express").Router();
const Category = require("../models/category");

//Create Category

router.post("/categorypost", async (req, res) => {

    const newCategory = new Category({
        name: req.body.name
      
    })

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory)
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET :Fetch all Categories

router.get('/', (req, res) => {
    Category.find()
        .then(Category => res.json(Category))
        .catch(err => res.status(500).json({ message: 'Error fetching categories', err }));

})

//DELETE Category

router.delete("/:id", async (req, res) => {

    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Category has been deleted....");
    } catch (err) {
        res.status(500).json(err);
    }
    });


//Get Category By ID

router.get("/:id", async (req, res) => {

    try {
        const OneCategory =  await Category.findById(req.params.id);
        res.status(200).json(OneCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update category

router.put("/:id", async (req, res) => {

    try {
        const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(201).json(UpdatedCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;