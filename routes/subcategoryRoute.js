const express = require("express");
const router = require("express").Router();
const SubCategory = require("../models/subcategory");
const category = require("../models/category");



//Create SubCategory

router.post("/subcategorypost", async (req, res) => {

    const newSubCategory = new SubCategory({
        name: req.body.name,
        category: req.body.category

    })

    try {
        const savedSubCategory = await newSubCategory.save();
        res.status(201).json(savedSubCategory)
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET :Fetch all SubCategories

router.get('/', async (req, res) => {
    try {
        const subcategories = await SubCategory.find().populate('category');
        res.json(subcategories);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching SubCategories' });

    }
});


//DELETE SubCategory

router.delete("/:id", async (req, res) => {

    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        res.status(200).json("SubCategory has been deleted....");
    } catch (err) {
        res.status(500).json(err);
    }
});



//Get SubCategory By ID

router.get("/:id", async (req, res) => {

    try {
        const OneSubCategory = await SubCategory.findById(req.params.id).populate('category');
        if (!SubCategory)
            return res.status(404).send({ message: 'Subcategory not found' });

        res.json(OneSubCategory);
    } catch (err) {
        res.status(500).send({ message : 'Error fetching SubCategory' })
    }
});


//Update Subcategory

router.put("/:id", async (req, res) => {

    try {
        const OneSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!SubCategory) {
            return res.status(404).send({ message: 'Subcategory not found' });
        }
        
        res.json(OneSubCategory);
    } catch (err) {
        res.status(500).send({ message: 'Error Updating SubCategory' })
    }
});


module.exports = router;