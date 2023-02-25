function decrypt() {
    const input = document.getElementById("input").value.toLowerCase();
    const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
    let output = "";
    const results = [];
    
    for (let shift = 1; shift < alphabet.length; shift++) {
      output = "";
      for (let i = 0; i < input.length; i++) {
        let char = input[i];
        let index = alphabet.indexOf(char);
        if (index === -1) {
          output += char;
        } else {
          let shiftedIndex = (index - shift + alphabet.length) % alphabet.length;
          output += alphabet[shiftedIndex];
        }
      }
      results.push(output);
    }
  
    const outputList = document.getElementById("output");
    outputList.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
      const li = document.createElement("li");
      li.textContent = `Сдвиг на ${i+1}: ${results[i]}`;
      outputList.appendChild(li);
    }
  }
  