// No input no output only process something

/* function add() {
    console.log('roshan dev')
} 

add()*/

//no output only input and process
/* function add(a,b) {
    console.log(a+' '+b)
} 

add('roshan','dev') */

//No input only output and process
/* function add() {
    return 'roshan dev'
} 

console.log(add()) */

//Input and output and process
/* function add(a,b) {
    return a+' '+b
} 

console.log(add('roshan','dev')) */

//Input and output and process with delay/////Problem
/* function add(a,b) {
    setTimeout(() => {
        return a+' '+b
    }, 300);
} 

console.log(add('roshan','dev'))  //==========> Gives result undefined */

//Solving above problem with callback
function add(a,b,callback) {
    setTimeout(function() {
        callback(a+' '+b)
    }, 300);
} 




add('roshan','dev',function(data) {
    console.log(data)
})