// ************ Require's ************
const express = require('express');
const multer = require ('multer');
const path = require ('path');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../public/images/products'))
    },
    filename:(req,file,cb)=>{
        const newFilename = Date.now()+'_'+file.originalname;
        cb(null,newFilename);
    } 
});
const upload=multer({storage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create',upload.single('imagen'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 
 

/*** DELETE ONE PRODUCT***/ 

router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
