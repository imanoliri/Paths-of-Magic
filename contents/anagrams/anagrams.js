// List of words
const wordCounts = {
    "magnus": 210,
    "water": 66,
    "magic": 60,
    "rock": 28,
    "land": 27,
    "other": 22,
    "time": 19,
    "tower": 19,
    "powerful": 19,
    "essence": 19,
    "king": 19,
    "knew": 19,
    "path": 18,
    "mage": 18,
    "how": 16,
    "world": 15,
    "realized": 15,
    "journey": 14,
    "way": 13,
    "too": 13,
    "saw": 13,
    "power": 13,
    "seemed": 13,
    "eye": 13,
    "life": 11,
    "book": 11,
    "chapter": 10,
    "day": 10,
    "long": 10,
    "grew": 10,
    "wasnt": 9,
    "distance": 9,
    "continue": 9,
    "see": 9,
    "far": 8,
    "magical": 8,
    "learned": 8,
    "control": 8,
    "understood": 8,
    "small": 7,
    "came": 7,
    "became": 7,
    "village": 6,
    "different": 6,
    "decided": 6,
    "merchant": 6,
    "however": 6,
    "clear": 5,
    "sea": 5,
    "thought": 5,
    "felt": 5,
    "manipulate": 5,
    "slightly": 5,
    "left": 5,
    "returned": 5,
    "understand": 5,
    "element": 5,
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
