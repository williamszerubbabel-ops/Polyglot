const translateButton = document.querySelector(".translate-button");
const textInput = document.querySelector("#textInput");
const translationResult = document.querySelector("#translationResult");

const sourceLanguage = document.querySelector("#sourceLanguage");
const targetLanguage = document.querySelector("#targetLanguage");

const translations = {
    "hello": "habari",
    "goodbye": "kwaheri",
    "thank you": "asante",
    "please": "tafadhali",
    "welcome": "karibu",
    "good morning": "habari za asubuhi",
    "good afternoon": "habari za mchana",
    "good evening": "habari za jioni",
    "how are you": "habari yako",
    "i am fine": "niko vizuri",
    "my name is": "jina langu ni",
    "yes": "ndiyo",
    "no": "hapana",
    "water": "maji",
    "food": "chakula",
    "friend": "rafiki"
};

function translateText() {
    const text = textInput.value.toLowerCase().trim();
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (source === "English" && target === "Swahili") {

        const words = text.split(" ");
        const translatedWords = [];

        words.forEach(function(word) {
            if (translations[word]) {
                translatedWords.push(translations[word]);
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