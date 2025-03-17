let start = "150.0.0.0";
let end = "150.0.0.1";
function strManipulation(){
    let splitStr = str.split(' ')
    let newArr = [];
    let regex = /\p{P}/gu;
    for(let i = 0; i < splitStr.length; i++){
        if(splitStr[i].match(regex)){
            newArr.push(splitStr[i]);
        } else {
            let newStr = splitStr[i].slice(1) + splitStr[i].slice(0,1) + 'ay';
            newArr.push(newStr);
        }
    }
    let endStr = newArr.join(" ");
    return endStr;
}

console.log(endStr);
