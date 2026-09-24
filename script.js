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

        if (translations[text]) {
            translationResult.textContent = translations[text];
            return;
        }

        const words = text.split(" ");
        const translatedWords = [];
        let i = 0;

        while (i < words.length) {

            const twoWords = words[i] + " " + words[i + 1];

            if (translations[twoWords]) {
                translatedWords.push(translations[twoWords]);
                i += 2;
            } else if (translations[words[i]]) {
                translatedWords.push(translations[words[i]]);
                i += 1;
            } else {
                translatedWords.push(words[i]);
                i += 1;
            }
        }

        translationResult.textContent = translatedWords.join(" ");

    } else {
        translationResult.textContent =
            "This translation combination is not available yet.";
    }
}

translateButton.addEventListener("click", translateText);