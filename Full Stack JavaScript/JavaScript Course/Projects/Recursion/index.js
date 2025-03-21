function fibs(n) {
  if (n < 0) return [];
  if (n === 0) return [0];
  if (n === 1) return [0, 1];

  let sequence = [0, 1];
  while (sequence.length < n) {
    sequence.push(sequence.at(-1) + sequence.at(-2));
  }

  return sequence;
}

console.log(fibs(Number(window.prompt('Enter a number:', '0'))));

// bubble sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort(Array.from({ length: 100 }, () => Math.floor(Math.random() * 100) + 1)));

// merge sort
function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    sortedArr.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return [...sortedArr, ...left, ...right];
}

console.log(mergeSort(Array.from({ length: 999999 }, () => Math.floor(Math.random() * 10000000000) + 1)));
