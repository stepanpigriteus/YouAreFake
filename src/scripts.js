function deleteChar(inputString) {
    if (inputString.length === 0) {
        return inputString;
    }
    let index = Math.floor(Math.random() * inputString.length);
    return inputString.slice(0, index) + inputString.slice(index + 1);
}

function insertChar(inputString) {
    let index = Math.floor(Math.random() * (inputString.length + 1));
    let randomChar = Math.floor(Math.random() * 10);
    return inputString.slice(0, index) + randomChar + inputString.slice(index);
}

function swapChar(inputString) {
    if (inputString.length < 2) {
        return inputString;
    }
    let index = Math.floor(Math.random() * (inputString.length - 1));
    return inputString.slice(0, index) + inputString[index + 1] + inputString[index] + inputString.slice(index + 2);
}

const alphabets = {
    pl: ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'r', 's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż'],
    ge: ['a', 'ä', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'ö', 'p', 'q', 'r', 's', 'ß', 't', 'u', 'ü', 'v', 'w', 'x', 'y', 'z'],
    usa: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    num: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

export function randomError(inputString, selectedRange, selectedCountry) {
    let numberOfErrors = Math.trunc(selectedRange); 
    let alphabet = alphabets[selectedCountry] || alphabets.pl; 
    let newValue = inputString;
    Array.from({ length: numberOfErrors }).map(() => {
        let errorSelect = Math.floor(Math.random() * 3); 
        let randomChar = alphabet[Math.floor(Math.random() * alphabet.length)]; 
        switch (errorSelect) {
            case 0:
                newValue = deleteChar(newValue);
                break;
            case 1:
                newValue = insertChar(newValue, randomChar);
                break;
            case 2:
                newValue = swapChar(newValue);
                break;
            default:
                break;
        }
        return null;
    });
    return newValue;
}
