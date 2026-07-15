let inputChanged = true;

const inputArea = document.getElementById("inputArea");
const outputArea = document.getElementById("outputArea");

const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");
const clearButton = document.getElementById("clearButton");

inputArea.addEventListener("input", () => {
    inputChanged = true;
});

encryptButton.addEventListener("click", () => {
    if (inputChanged || outputArea.value.trim() === "") {
        outputArea.value = encrypt(inputArea.value);
        inputChanged = false;
    } else {
        outputArea.value = encrypt(outputArea.value);
    }
});

decryptButton.addEventListener("click", () => {
    if (inputChanged || outputArea.value.trim() === "") {
        outputArea.value = decrypt(inputArea.value);
        inputChanged = false;
    } else {
        outputArea.value = decrypt(outputArea.value);
    }
});

clearButton.addEventListener("click", () => {
    inputArea.value = "";
    outputArea.value = "";
    inputChanged = true;
    inputArea.focus();
});

function encrypt(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const original = text[i];

        if (isEnglishLetter(original)) {
            const isUpper = original >= "A" && original <= "Z";
            const lower = original.toLowerCase();

            const changed = changeLetter(lower);
            const number = 26 - (changed.charCodeAt(0) - "a".charCodeAt(0));

            if (isUpper) {
                result += convertNumberToSymbols(number) + " ";
            } else {
                result += number + " ";
            }

        } else {
            result += encryptSpecial(original) + " ";
        }
    }

    return result.trim();
}

function decrypt(text) {
    let result = "";

    if (text.trim() === "") {
        return "";
    }

    const parts = text.trim().split(/\s+/);

    for (const part of parts) {
        if (part.startsWith("§")) {
            result += decryptSpecial(part);
        } else {
            try {
                const isUpper = containsCapitalSymbol(part);
                const number = isUpper ? convertSymbolsToNumber(part) : parseInt(part);

                if (number >= 1 && number <= 26) {
                    const changed = String.fromCharCode("a".charCodeAt(0) + (26 - number));
                    const original = reverseChangeLetter(changed);

                    result += isUpper ? original.toUpperCase() : original;
                }
            } catch (e) {
                // ignore invalid parts
            }
        }
    }

    return result;
}

function isEnglishLetter(c) {
    return /^[a-zA-Z]$/.test(c);
}

function encryptSpecial(c) {
    const code = c.charCodeAt(0);
    return "§" + convertNumberToSymbols(code);
}

function decryptSpecial(token) {
    const symbols = token.substring(1);
    const code = convertSymbolsToNumber(symbols);
    return String.fromCharCode(code);
}

function convertNumberToSymbols(number) {
    const str = String(number);
    let result = "";

    for (const c of str) {
        switch (c) {
            case "1": result += "!"; break;
            case "2": result += "@"; break;
            case "3": result += "#"; break;
            case "4": result += "$"; break;
            case "5": result += "%"; break;
            case "6": result += "?"; break;
            case "7": result += "&"; break;
            case "8": result += "*"; break;
            case "9": result += "("; break;
            case "0": result += ")"; break;
        }
    }

    return result;
}

function convertSymbolsToNumber(symbols) {
    let number = "";

    for (const c of symbols) {
        switch (c) {
            case "!": number += "1"; break;
            case "@": number += "2"; break;
            case "#": number += "3"; break;
            case "$": number += "4"; break;
            case "%": number += "5"; break;
            case "?": number += "6"; break;
            case "&": number += "7"; break;
            case "*": number += "8"; break;
            case "(": number += "9"; break;
            case ")": number += "0"; break;
        }
    }

    return parseInt(number);
}

function containsCapitalSymbol(s) {
    return /[!@#$%?&*()]/.test(s);
}

function changeLetter(c) {
    switch (c) {
        case "a": return "o";
        case "b": return "r";
        case "c": return "v";
        case "d": return "n";
        case "e": return "a";
        case "f": return "t";
        case "g": return "l";
        case "h": return "s";
        case "i": return "e";
        case "j": return "k";
        case "k": return "d";
        case "l": return "y";
        case "m": return "u";
        case "n": return "i";
        case "o": return "h";
        case "p": return "b";
        case "q": return "c";
        case "r": return "m";
        case "s": return "g";
        case "t": return "p";
        case "u": return "w";
        case "v": return "f";
        case "w": return "x";
        case "x": return "q";
        case "y": return "z";
        case "z": return "j";
        default: return c;
    }
}

function reverseChangeLetter(c) {
    switch (c) {
        case "o": return "a";
        case "r": return "b";
        case "v": return "c";
        case "n": return "d";
        case "a": return "e";
        case "t": return "f";
        case "l": return "g";
        case "s": return "h";
        case "e": return "i";
        case "k": return "j";
        case "d": return "k";
        case "y": return "l";
        case "u": return "m";
        case "i": return "n";
        case "h": return "o";
        case "b": return "p";
        case "c": return "q";
        case "m": return "r";
        case "g": return "s";
        case "p": return "t";
        case "w": return "u";
        case "f": return "v";
        case "x": return "w";
        case "q": return "x";
        case "z": return "y";
        case "j": return "z";
        default: return c;
    }
}
