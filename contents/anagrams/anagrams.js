// List of words
const wordCounts = {
    "magnus": 216,
    "water": 66,
    "magic": 62,
    "rock": 29,
    "land": 27,
    "other": 21,
    "time": 20,
    "essence": 20,
    "tower": 19,
    "powerful": 19,
    "king": 19,
    "knew": 19,
    "path": 18,
    "mage": 17,
    "how": 16,
    "world": 15,
    "way": 15,
    "realized": 15,
    "seemed": 15,
    "journey": 14,
    "eye": 14,
    "too": 13,
    "saw": 13,
    "power": 12,
    "life": 11,
    "day": 11,
    "grew": 11,
    "book": 11,
    "far": 10,
    "chapter": 10,
    "long": 10,
    "place": 9,
    "wasnt": 9,
    "distance": 9,
    "magical": 9,
    "see": 9,
    "continue": 8,
    "learned": 8,
    "control": 8,
    "understood": 8,
    "small": 7,
    "felt": 7,
    "became": 7,
    "however": 7,
    "village": 6,
    "different": 6,
    "came": 6,
    "decided": 6,
    "element": 6,
    "merchant": 6,
    "clear": 5,
    "sea": 5,
    "thought": 5,
    "manipulate": 5,
    "slightly": 5,
    "left": 5,
    "returned": 5,
    "trap": 5,
    "view": 5,
    "always": 5
};

const charsToIgnore = [" ", ",", "-", "—", ";", ".", "'", "`", "´"];
const words = Object.keys(wordCounts);
let currentWord = "";
let anagramWord = "";



// Function to shuffle letters to create an anagram
function shuffle(word) {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
}

// Function to select a new word and create an anagram
function selectNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    anagramWord = shuffle(currentWord);
    document.getElementById('anagram').textContent = anagramWord;
    document.getElementById('guess').value = "";
    document.getElementById('guess').className = "";
}

// Function to check if the user's guess is correct
function checkGuess() {
    const guess = document.getElementById('guess').value;
    if (cleanWord(guess) === cleanWord(currentWord)) {
        document.getElementById('guess').className = "correct";
    } else {
        document.getElementById('guess').className = "wrong";
    }
}

function cleanWord(word) {
    return charsToIgnore.reduce((cleanedWord, sep) => {
        return cleanedWord.replace(new RegExp(`\\${sep}`, 'g'), '');
    }, word).toLowerCase();
}

// Event listeners
document.getElementById('guess').addEventListener('input', checkGuess);
document.getElementById('next').addEventListener('click', selectNewWord);

// Initialize the first word
selectNewWord();
