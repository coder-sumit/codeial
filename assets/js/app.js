let count = 0;
document.addEventListener('click', function(target){
    if(count%2 == 0){
        document.body.style.backgroundColor="red";
    }else{
        document.body.style.backgroundColor="blue";

    }
    count++;
});