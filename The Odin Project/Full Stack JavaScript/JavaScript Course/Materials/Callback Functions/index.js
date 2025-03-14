// window.onload = function () {
//   const fruits = ['Banana', 'Apple', 'Pear'];
//   fruits.forEach(function (val) {
//     console.log(val);
//   });
// };

let promise = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a !== 2) {
    resolve('Success');
  } else {
    reject('Failed');
  }
});

promise.then((result) => { // if success (resolve)...
  console.log(`${result} was successful!`);
}).catch((result) => {
  console.log(`${result} was not successful!`);
}).finally(() => {
  console.log("You're so skibidi btw!")
});
