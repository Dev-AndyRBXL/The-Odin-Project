const {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
} = require('../index'); // functions imported from 'index.js'

// capitalize
test('capitalizes the first character of the string: "hello, World!", and returns it', () => {
  expect(capitalize('hello, World!')).toBe('Hello, World!');
});
test('should return -1 since you cannot capitalize a non-letter', () => {
  expect(capitalize('#i_love_pizza')).toBe(-1);
});

// reverseString
test('reverses the string "hello, World! and returns it', () => {
  expect(reverseString('Hello, World!')).toBe('!dlroW ,olleH');
});

// calculator
test('adds 4 and 5, and returns it', () => {
  expect(calculator(5, 10, '+')).toBe(15);
});

// caesarChipher
test('encrypts the message "hey" to "KHB"', () => {
  expect(caesarCipher('hey', 3)).toBe('KHB');
});

// analyzeArray
test("analyzes the array's data", () => {
  expect(analyzeArray([5, 4, 1, 3, 9, 2])).toEqual({
    average: 4,
    min: 1,
    max: 9,
    length: 6
  });
});
