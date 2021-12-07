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

router.get('/add', (req,res)=>{
    try{
        res.render('addProvinsi');
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.post('/add', upload.single('photo') , async(req,res)=>{
    try{
        const {nama,pulau} = req.body;
        const photo = req.file;

        if(!nama || !pulau || !photo){
            console.log('please inpiut all field');
            return res.redirect('/product/add');
        }

        let photoSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
        await tb_provinsi.insertProvinsi(nama,photoSrc,pulau);
        res.redirect('/');

    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

router.get('/:id', async(req,res)=>{
    try{
        //console.log(req.params.id);
        const provinsi =  await tb_provinsi.getProvinsiById(req.params.id);
        const kabupaten = await tb_kabupaten.getKabupatenByProvinsiId(req.params.id);
        //console.log(provinsi);
        res.render('provinsiDetails',{provinsi,kabupaten})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});


router.get('/update/:id',async (req,res)=>{
    try{
        const provinsi =  await tb_provinsi.getProvinsiById(req.params.id);
        res.render('provinsiUpdate',{provinsi})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/update/:id',upload.single('photo'), async(req,res)=>{
    try{
        const {nama,pulau} = req.body;
        const photo = req.file;
        const id = req.params.id;
        
        if(!nama || !photo || !pulau){
            console.log('input all field');
            return res.redirect(`/provinsi/update/${id}`)
        }
        //console.log(id);
        let photoSrc = 'http://127.0.0.1:3000/images/' + req.file.filename;
        await tb_provinsi.editProvinsiById(id,nama,photoSrc,pulau);
        res.redirect(`/provinsi/${id}`);
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

router.get('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await tb_provinsi.deleteProvinsiById(id);
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }
});

module.exports = router;