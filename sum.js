var b = "Hello";
function calculate(a, b){
    console.log(a + b)
}
calculate(1,3);
module.exports = {
    b: b,
    calculate: calculate
}
// module.exports = {
//     b,
//     calculate
// }