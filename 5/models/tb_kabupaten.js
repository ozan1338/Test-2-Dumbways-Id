const e = require("express");
const connection = require("./connection")

let tb_kabupaten = {};

tb_kabupaten.getKabupatenById = (id) =>{
    return new Promise ((resolve,reject)=>{
        connection.query(`select * from kabupaten_tb where id = ${id}`, (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

tb_kabupaten.getKabupatenByProvinsiId = (id) =>{
    return new Promise ((resolve,reject)=>{
        connection.query(`select * from kabupaten_tb where provinsi_id = ${id}`, (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

tb_kabupaten.insertKabupaten = (nama,photo,provinsi_id) =>{
    return new Promise ((resolve,reject)=>{
        connection.query(`insert into kabupaten_tb (nama,photo,provinsi_id) values('${nama}','${photo}',${provinsi_id})`, (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

tb_kabupaten.editKabupatenByIdWithoutProvinsi = (id,nama,photo) =>{
    return new Promise ((resolve,reject)=>{
        connection.query(`update kabupaten_tb set nama = '${nama}', photo = '${photo}' where id = ${id}`, (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

tb_kabupaten.editKabupatenByIdWithProvinsi = (id,nama,photo,provinsi_id) =>{
    return new Promise ((resolve,reject)=>{
        connection.query(`update kabupaten_tb set nama = '${nama}', photo = '${photo}', provinsi_id = ${provinsi_id} where id = ${id}`, (err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
};

tb_kabupaten.deleteKabupatenById = (id) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`delete from kabupaten_tb where id = ${id}`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

module.exports = tb_kabupaten;
