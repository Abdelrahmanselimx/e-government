const express = require("express");
const router = require("express").Router();
const SubCategory = require("../models/subcategory");
const Product = require("../models/product");



//Create Product

router.post("/productpost", async (req, res) => {

    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        subcategory: req.body.subcategory

    })

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET :Fetch all Products

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('subcategory');
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error fetching products' });

    }
});


//DELETE Product

router.delete("/:id", async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted....");
    } catch (err) {
        res.status(500).json(err);
    }
});



//Get Product By ID

router.get("/:id", async (req, res) => {

    try {
        const OneProduct = await Product.findById(req.params.id).populate('subcategory');
        if (!Product)
            return res.status(404).send({ message: 'Subcategory not found' });

        res.json(OneProduct);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching SubCategory' })
    }
});


//Update Product

router.put("/:id", async (req, res) => {

    try {
        const OneProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.json(OneProduct);
    } catch (err) {
        res.status(500).send({ message: 'Error Updating Product' })
    }
});


module.exports = router;