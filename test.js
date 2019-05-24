var fs = require('fs'),
    sum = fs.readFileSync('input.txt', 'utf8'),
    o = sum.split("\n"),
    ot = 0;
function getSum(){
    for(var i=0; i<o.length; i++){
        ot = ot + parseInt(o[i])
    }
    return ot;
}
var output = getSum(o);
console.log(output);

// check for 1 repeated sum

function duplicateFrequency(arr) {
    let num = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr.lastIndexOf(arr[i]) !== i) {
        num = arr[i];
        break;
      }
    }
    return num;
  }
var repeatedNum = duplicateFrequency(o);
console.log(duplicateFrequency(o));

// function mode(array)
// {
//     if(array.length == 0)
//         return null;
//     var modeMap = {};
//     var maxEl = array[0], maxCount = 1;
//     for(var i = 0; i < array.length; i++)
//     {
//         var el = array[i];
//         if(modeMap[el] == null)
//             modeMap[el] = 1;
//         else
//             modeMap[el]++;  
//         if(modeMap[el] > maxCount)
//         {
//             maxEl = el;
//             maxCount = modeMap[el];
//         }
//     }
//     return maxEl;
// }

// var a = mode(o);
// console.log(a)
