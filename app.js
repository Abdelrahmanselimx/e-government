const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subcategoryRoute");
const productRoute = require("./routes/productRoute");
const favModuleRoute = require("./routes/favModuleRoute");
const imageModel = require('./models/Image');
const multerConfig = require('./multer');



// serve images in directory named images 
app.use('/uploads', express.static('uploads'))


app.post('/myImages', multerConfig, async (req, res) => {

    res.send(req.files[0])

    const imageDetails = {
        imageName: req.files[0].originalname,
        url: req.files[0].path
    }
    const image = new imageModel(imageDetails)
    image.save()

})

app.get('/myImages', async (req, res) => {
    const images = await imageModel.find()
    res.json(images)
})

//connect server to mongo ==> local db

mongoose.connect("mongodb://0.0.0.0:27017/E-COMMERCE",)
    .then(() => console.log('DB now is connected'))
    .catch((err) => { console.error(err); });

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/Product", productRoute);
app.use("/api/favModule", favModuleRoute);





app.listen(3000, () => {
    console.log("server is opened");
})
