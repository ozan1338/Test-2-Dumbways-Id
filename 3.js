let string = "";
const drawImage = (n) => {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(j === 0 || j === n-1 ){
                if( i !== 0 && i !== n-1){
                    if( i === Math.floor(n/2)){
                        string += "*";
                    }else{
                        string += "#";
                    }
                }else{
                    string += "*"
                }
            }else if( j === Math.floor(n/2)){
                if(i === Math.floor(n/2)){
                    string += "#";
                }else{
                    string += '*'
                }
            }
            else{
                if(i === Math.floor(n/2)){
                    string += "*";
                }else{
                    string += "#"
                }
            } 
        }
        string += "\n";
    }
    return string
}


console.log(drawImage(7));
