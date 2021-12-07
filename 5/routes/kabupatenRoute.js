const express = require('express');
const router = express.Router();
const tb_provinsi = require('../models/tb_provinsi');
const tb_kabupaten = require('../models/tb_kabupaten');
const multer = require('multer');
const path = require('path');

//! Use of Multer
let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  let upload = multer({
    storage: storage,
});

router.get('/add', async(req,res)=>{
    try{
        const provinsi = await tb_provinsi.getAllProvinsi();
        res.render('addKabupaten',{provinsi});
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.post('/add', upload.single('photo') , async(req,res)=>{
    try{
        const {nama,provinsiName} = req.body;
        const photo = req.file;

        if(!nama || !photo){
            console.log('please insert all field');
            return res.redirect('/kabupaten/add');
        }

        let photoSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;

        const provinsi = await tb_provinsi.getProvinsiByName(provinsiName);
        const provinsiId = provinsi[0].id;

        await tb_kabupaten.insertKabupaten(nama,photoSrc,provinsiId);
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.get('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const kabupaten = await tb_kabupaten.getKabupatenById(id);
        res.render('kabupatenDetails',{kabupaten});
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.get('/update/:id', async(req,res)=>{
    try{
        const provinsi = await tb_provinsi.getAllProvinsi();
        res.render('kabupatenUpdate',{provinsi})
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.post('/update/:id', upload.single('photo') , async(req,res)=>{
    try{
        const {nama,provinsiName} = req.body;
        const photo = req.file;
        const id = req.params.id;

        if(!nama || !photo){
            console.log('please input all field');
            return res.redirect(`/kabupaten/update/${id}`);
        }

        let photoSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
        const provinsi = await tb_provinsi.getProvinsiByName(provinsiName);
        const provinsiId = provinsi[0].id;
        
        await tb_kabupaten.editKabupatenByIdWithProvinsi(id,nama,photoSrc,provinsiId);
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.get('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await tb_kabupaten.deleteKabupatenById(id);
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

module.exports = router;