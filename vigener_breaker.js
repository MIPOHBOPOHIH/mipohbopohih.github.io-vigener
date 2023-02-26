function decrypt() {
  let cipherText = document.getElementById("input").value.toLowerCase();
  const keyLength = document.getElementById("key-length").value;
  let possibleKeys = generatePossibleKeys(keyLength);

  let decryptedTexts = [];
  for (let i = 0; i < possibleKeys.length; i++) {
    let key = possibleKeys[i];
    let decryptedText = "";
    for (let j = 0; j < cipherText.length; j++) {
      let keyIndex = j % keyLength;
      let keyCharCode = key.charCodeAt(keyIndex) - 97;
      let cipherCharCode = cipherText.charCodeAt(j) - 97;
      let decryptedCharCode = (cipherCharCode - keyCharCode + 26) % 26 + 97;
      decryptedText += String.fromCharCode(decryptedCharCode);
    }
    decryptedTexts.push(decryptedText);
  }

  let outputList = document.getElementById("output");
  outputList.innerHTML = "";
  for (let i = 0; i < decryptedTexts.length; i++) {
    let listItem = document.createElement("li");
    listItem.textContent = decryptedTexts[i];
    outputList.appendChild(listItem);
  }
}

function generatePossibleKeys(length) {
  let possibleKeys = [];

  function generateKeysRecursive(prefix) {
    if (prefix.length === length) {
      possibleKeys.push(prefix);
      return;
    }
    for (let i = 0; i < 26; i++) {
      generateKeysRecursive(prefix + String.fromCharCode(i + 97));
    }
  }

  generateKeysRecursive("");
  return possibleKeys;
}
