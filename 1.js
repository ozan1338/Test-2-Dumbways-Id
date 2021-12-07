const hitungBarang = (barang,quantity)=>{
    if(barang === 'A'){
        if(quantity >13){
            return (4550 * quantity) - (231 * quantity)
        }
    }else if(barang === 'B'){
        if(quantity > 7){
            console.log('hello');
            return (5330 * quantity) - (0.23 * 5330);
        }
    }else{
        return `tidak ada promo untuk barang ini`
    }
    return
}

const barangA = hitungBarang('A',14);
const barangB = hitungBarang('B',8);
const barangC = hitungBarang('C',9);

console.log(barangA);
console.log(barangB);
console.log(barangC);