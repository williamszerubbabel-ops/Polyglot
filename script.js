const translateButton = document.querySelector(".translate-button");
const textInput = document.querySelector("#textInput");
const translationResult = document.querySelector("#translationResult");

const sourceLanguage = document.querySelector("#sourceLanguage");
const targetLanguage = document.querySelector("#targetLanguage");

const translations = {
    "hello": "habari",
    "thank you": "asante",
    "welcome": "karibu",
    "good morning": "habari za asubuhi"
};

translateButton.addEventListener("click", function() {

    const text = textInput.value.toLowerCase().trim();

    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    if (source === "English" && target === "Swahili") {

        if (translations[text]) {
            translationResult.textContent = translations[text];
        } else {
            translationResult.textContent = "I don't know this word yet.";
        }

    } else {

        translationResult.textContent =
            "This translation combination is not available yet.";

    }

});