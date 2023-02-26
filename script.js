// Функция расшифровки шифра Виженера при известной длине ключа
function vigenereBreaker(ciphertext, keyLength) {
  // Создаем массивы для хранения подстрок шифротекста и отдельных символов
  let substrings = [];
  let characters = [];

  // Разбиваем шифротекст на подстроки длиной keyLength символов
  for (let i = 0; i < keyLength; i++) {
    substrings.push([]);
    for (let j = i; j < ciphertext.length; j += keyLength) {
      substrings[i].push(ciphertext.charAt(j));
    }
  }

  // Для каждой подстроки находим частоту появления символов и
  // и сдвигаем ее наиболее часто встречающийся символ на позицию E (код 69)
  let shifts = [];
  for (let i = 0; i < keyLength; i++) {
    let frequencies = [];
    for (let j = 0; j < 26; j++) {
      frequencies.push(0);
    }
    for (let j = 0; j < substrings[i].length; j++) {
      let index = substrings[i][j].charCodeAt(0) - 65;
      frequencies[index]++;
    }
    let maxIndex = 0;
    for (let j = 1; j < 26; j++) {
      if (frequencies[j] > frequencies[maxIndex]) {
        maxIndex = j;
      }
    }
    shifts.push(maxIndex - 4);
  }

  // Восстанавливаем ключ и расшифровываем шифротекст
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    let charCode = 65 + (26 - shifts[i]) % 26;
    key += String.fromCharCode(charCode);
  }
  let plaintext = '';
  let keyIndex = 0;
  for (let i = 0; i < ciphertext.length; i++) {
    let charCode = ((ciphertext.charCodeAt(i) - 65) - (key.charCodeAt(keyIndex) - 65) + 26) % 26 + 65;
    plaintext += String.fromCharCode(charCode);
    keyIndex = (keyIndex + 1) % keyLength;
  }

  // Возвращаем результат
  return {
    key: key,
    plaintext: plaintext
  };
}
