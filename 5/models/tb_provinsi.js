const connection = require('./connection');

let tb_provinsi = {};

tb_provinsi.getAllProvinsi = () => {
    return new Promise ((resolve,reject)=>{
        connection.query(`select * from provinsi_tb`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

tb_provinsi.getProvinsiById = (id) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`select * from provinsi_tb where id = ${id}`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

tb_provinsi.getProvinsiByName = (name) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`select * from provinsi_tb where nama = '${name}'`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

tb_provinsi.insertProvinsi = (nama,photo,pulau) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`insert into provinsi_tb (nama,photo,pulau) values ('${nama}','${photo}','${pulau}')`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        })
    })
}

tb_provinsi.editProvinsiById = (id,nama,photo,pulau) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`update provinsi_tb set nama = '${nama}', photo = '${photo}', pulau = '${pulau}' where id = ${id}`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

tb_provinsi.deleteProvinsiById = (id) => {
    return new Promise ((resolve,reject)=>{
        connection.query(`delete from provinsi_tb where id = ${id}`, (err,result)=>{
            if(err){
                return reject(err);
            }else{
                return resolve(result);
            }
        });
    });
};

module.exports = tb_provinsi