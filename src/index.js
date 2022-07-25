const MORSE_TABLE = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
  };
  
  const NUMBER_DECODE = {
      '.': '10',
      '-': '11',
      ' ': '**********',
  };
  
  
  function decode(expr) {
      let result = [];
  
      if (isDecoded(expr)) {
          let binaryWords = [];
          chunk(expr, 10).forEach(word => binaryWords.push(decryptWord(word).join('')));
          binaryWords.forEach(word => result.push(MORSE_TABLE[word] || ' '));
      } else {
          expr.split('').forEach((letter) => {
              const decoded = letter !== ' ' ? getKeyByValue(MORSE_TABLE, letter) : ' ';
              result.push(decodeSymbol(decoded));
          });
      }
  
      return result.join('');
  }
  
  function decryptWord(decodedWord) {
      let decryptedWords = [];
      if (decodedWord === '**********') { return [' '] }
      chunk(decodedWord, 2).forEach(item => {
          if (item !== '00') {
              decryptedWords.push(getKeyByValue(NUMBER_DECODE, item))
          }
      });
  
      return decryptedWords;
  }
  
  function decodeSymbol(symb) {
      if (symb === ' ') {
          return NUMBER_DECODE[' ']
      }
      const decoded = []
      let templateArray = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
      symb.split('').forEach((x) => {
          decoded.push(NUMBER_DECODE[x])
      })
  
      const stringToReplace = decoded.join('')
      templateArray.splice(templateArray.length - stringToReplace.length,
          stringToReplace.length,
          stringToReplace);
      return templateArray.join('');
  }
  
  function chunk(array, size) {
      const chunked_arr = [];
      let index = 0;
      while (index < array.length) {
          chunked_arr.push(array.slice(index, size + index));
          index += size;
      }
  
      return chunked_arr;
  }
  
  
  function isDecoded(str) {
      return RegExp(/^[01*]+$/).test(str);
  }
  
  function getKeyByValue(object ,value) {
      return Object.keys(object).find(key => object[key] === value);
  }
  
  module.exports = {
    decode,
  };