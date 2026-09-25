const translateButton = document.querySelector(".translate-button");
const textInput = document.querySelector("#textInput");
const translationResult = document.querySelector("#translationResult");

const sourceLanguage = document.querySelector("#sourceLanguage");
const targetLanguage = document.querySelector("#targetLanguage");

const translations = {
    English: {
        Swahili: {
            "hello": "habari",
            "thank you": "asante",
            "welcome": "karibu",
            "good morning": "habari za asubuhi",
            "friend": "rafiki"
        },

        French: {
            "hello": "bonjour",
            "thank you": "merci",
            "welcome": "bienvenue",
            "good morning": "bonjour",
            "friend": "ami"
        },

        Spanish: {
            "hello": "hola",
            "thank you": "gracias",
            "welcome": "bienvenido",
            "good morning": "buenos días",
            "friend": "amigo"
        }
    }
};

function translateText() {
    const text = textInput.value.toLowerCase().trim();
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (translations[source] && translations[source][target]) {

        const dictionary = translations[source][target];

        // Check if the complete text exists
        if (dictionary[text]) {
            translationResult.textContent = dictionary[text];
            return;
        }

        // Translate word by word
        const words = text.split(" ");
        const translatedWords = [];

        words.forEach(function(word) {
            if (dictionary[word]) {
                translatedWords.push(dictionary[word]);
            } else {
                translatedWords.push(word);
            }
        });

        translationResult.textContent = translatedWords.join(" ");

    } else {
        translationResult.textContent =
            "This translation combination is not available yet.";
    }
}

translateButton.addEventListener("click", translateText);