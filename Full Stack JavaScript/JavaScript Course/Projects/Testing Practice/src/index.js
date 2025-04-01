function capitalize(str) {
  if (!/[a-zA-Z]/.test(str[0])) return -1;

  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function reverseString(str) {
  if (!str || typeof str !== 'string') return -1;

  let res = Array(str.length);

  for (let i = str.length - 1; i >= 0; i--) {
    res[str.length - i - 1] = str[i];
  }
  return res.join('');
}

function calculator(a, b, op = '+') {
  let result = 0;

  switch (op) {
    case '*':
      result = a * b;
      break;
    case '/':
      result = a / b;
      break;
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
  }
  return result;
}

function caesarCipher(str, shift) {
  if (!str || typeof str !== 'string') return -1;
  str = str.toLowerCase();

  return encryptStr(str, shift).toUpperCase();
}

function encryptStr(str, shift) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    result = shiftChar(str[i], shift, result);
  }
  return result;
}

function shiftChar(char, shift, result) {
  const exp = () => {
    return String.fromCharCode(
      ((((char.charCodeAt(0) - 97 + shift) % 26) + 26) % 26) + 97
    );
  };

  if (char.match(/[a-z]/)) {
    result += exp();
  } else {
    result += char;
  }
  return result;
}

function analyzeArray(arr) {
  if (!Array.isArray(arr) || !arr.length) return -1;
  let newArr = [...arr];
  newArr.sort((a, b) => a - b);

  let sum = newArr.reduce((acc, num) => acc + num, 0);
  let average = sum / newArr.length;
  let min = newArr[0];
  let max = newArr[newArr.length - 1];

  return {
    average,
    min,
    max,
    length: newArr.length,
  };
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
};
