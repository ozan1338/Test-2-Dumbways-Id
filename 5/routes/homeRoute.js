const express = require('express');
const router = express.Router();
const tb_provinsi = require('../models/tb_provinsi')
const multer = require('multer');
const path = require('path');

// //! Use of Multer
// let storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
//   });
  
//   let upload = multer({
//     storage: storage,
// });

router.get('/', async(req,res)=>{
    try{
        const provinsi =  await tb_provinsi.getAllProvinsi();
        //console.log(provinsi);
        res.render('home',{provinsi})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});



// router.get('/provinsi/:id', async(req,res)=>{
//     try{
//         const provinsi =  await tb_provinsi.getProvinsiById(req.params.id);
//         //console.log(provinsi);
//         res.render('provinsiDetails',{provinsi})
//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// router.get('/provinsi/add', (req,res)=>{
//     //console.log('lo');
//     res.render('addProvinsi');
    
// });

// router.get('/provinsi/update/:id',async (req,res)=>{
//     try{
//         const provinsi =  await tb_provinsi.getProvinsiById(req.params.id);
//         res.render('provinsiUpdate',{provinsi})
//     }catch(err){
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

// router.post('/provinsi/update/:id',upload.single('photo'), async(req,res)=>{
//     try{
//         const {nama,pulau} = req.body;
//         const photo = req.file;
//         const id = req.params.id;
//         let photoSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
//         if(!nama || !photo || !pulau){
//             console.log('input all field');
//             return res.redirect(`/provinsi/update/${id}`)
//         }
//         //console.log(id);
//         await tb_provinsi.editProvinsiById(id,nama,photoSrc,pulau);
//         res.redirect(`/provinsi/${id}`);
//     }catch(err){
//         console.log(err);
//         res.sendStatus(404);
//     }
// });

// router.get('/provinsi/delete/:id', async(req,res)=>{
//     try{
//         const id = req.params.id;
//         await tb_provinsi.deleteProvinsiById(id);
//         res.redirect('/');
//     }catch(err){
//         console.log(err);
//         res.sendStatus(404);
//     }
// })

module.exports = router