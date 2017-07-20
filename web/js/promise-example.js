function add(a,b){
        return new Promise(function(resolve, reject){
            if(a && b && typeof a === 'number' && typeof b === 'number'){
                resolve(a+b);
            }else{
                reject('Invalid input')
            }
        });
}

add(2,3).then(function(result){
    console.log(result);
},function(error){
    console.error(error);
});

add(2).then(function(result){
    console.log(result);
},function(error){
    console.error(error);
});