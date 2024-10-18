var b = "Hello";
function calculate(a, b){
    console.log(a + b)
}
// z= "Hello";
// console.log(z)
//  MODULE TYPE  PACKAGE JSON

// export function calculate(a, b){
//     console.log(a + b)
// }
calculate(1,3);
// module.exports = {
//     b: b,
//     calculate: calculate
// }
module.exports = {
     b,
     calculate
}
// module.exports = {
//     b,
//     calculate
// }





// {
//     "type" : "commonjs"
// }
// {
//     "type" : "module"
// }

setTimeout(()=>{
console.log("I'm in the sum file")
}, 0)