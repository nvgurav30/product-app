const express = require('express');
const multer = require('multer');
const Product = require('../models/product');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = new Error("Invalid mime type.");
        if(isValid) {
            error = null;
        }
        cb(error, "/backend/images/");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        const filename = name + '-' + Date.now() + '.' + ext;
        console.log("filename:"+name);
        cb(null, filename);
    }
});

let upload = multer({storage: storage});

var products = [];

//middleware function
// GET method to fetch all products
router.get('' ,(req, res, next) => {    
    query = Product.find({});
    query.exec(function (err, products) {
        if (err) { console.log(err); }
        res.status(200).json(products);
    });
});

// GET method to get count of all products
router.get('/count' ,(req, res, next) => {    
  query = Product.count({});
  query.exec(function (err, count) {
      if (err) { console.log(err); }      
      res.status(200).json(count);
  });
});


// POST method to add new product
router.post('/add', upload.single('image'), (req, res, next) => {   
    const url = req.protocol + "://" + req.get("host"); 
    const product = new Product({      
      productName: req.body.productName,
      productCode: req.body.productCode,
      releaseDate: req.body.releaseDate,
      description: req.body.description,
      price: req.body.price,
      starRating: req.body.starRating,
      imageUrl: url + "/backend/images/" + req.body.imageUrl
    });    

    product.save().then((createdProduct) => {
        res.status(201).json({
            message: "Product added successfully",
            product: {
                ...createdProduct,
                productId: product._id
            }
        }); 
    });
});

// GET method to fetch one product by id
router.get('/:id' ,(req, res, next) => {  
  query = Product.findById(req.params.id);
  query.exec(function (err, products) {      
      if (err) { console.log(err); }
      res.status(200).json(products);
  });
});

// GET method to fetch one product by id
router.put('/:id' ,(req, res, next) => {
    const product = new Product({ 
        _id: req.body.productId,
        productName: req.body.productName,
        productCode: req.body.productCode,
        releaseDate: req.body.releaseDate,
        description: req.body.description,
        price: req.body.price,
        starRating: req.body.starRating,
        imageUrl: req.body.imageUrl
      });    
    query = Product.updateOne({
          '_id': req.params.id
        },product);

    query.exec(function (err, products) {
        if (err) { console.log(err); }
        res.status(200).json({message: 'Update successfull!', data: product});
    });
});

// GET method to fetch one product by id
router.delete('/:id' ,(req, res, next) => {
    query = Product.deleteOne({'_id': req.params.id});
    query.exec(function (err, products) {
        if (err) { console.log(err); }
        res.status(200).json(products);
    });
  });

module.exports = router;