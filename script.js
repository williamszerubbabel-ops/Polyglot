const translateButton = document.querySelector(".translate-button");
const translationResult = document.querySelector("#translationResult");

const sourceLanguage = document.querySelector("#sourceLanguage");
const targetLanguageSelect = document.querySelector("#targetLanguage");

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
    },

    Swahili: {
        French: {
            "habari": "bonjour",
            "asante": "merci",
            "karibu": "bienvenue",
            "rafiki": "ami",
            "habari za asubuhi": "bonjour"
        },

        Spanish: {
            "habari": "hola",
            "asante": "gracias",
            "karibu": "bienvenido",
            "rafiki": "amigo",
            "habari za asubuhi": "buenos días"
        }
    },

    French: {
        Spanish: {
            "bonjour": "hola",
            "merci": "gracias",
            "bienvenue": "bienvenido",
            "ami": "amigo",
            "bon matin": "buenos días"
        },
    },
};

for (const sourceLanguage in translations) {
    for (const targetLanguage in translations[sourceLanguage]) {

        if (!translations[targetLanguage]) {
            translations[targetLanguage] = {};
        }

        if (!translations[targetLanguage][sourceLanguage]) {
            translations[targetLanguage][sourceLanguage] =
                createReverseDictionary(
                    translations[sourceLanguage][targetLanguage]
                );
        }
    }
}

function createReverseDictionary(dictionary) {
    const reverseDictionary = {};

    for (const word in dictionary) {
        reverseDictionary[dictionary[word]] = word;
    }

    return reverseDictionary;
}

function matchCapitalization(original, translated) {
    if (original === original.toUpperCase()) {
        return translated.toUpperCase();
    }

    if (
        original[0] === original[0].toUpperCase() &&
        original.slice(1) === original.slice(1).toLowerCase()
    ) {
        return translated.charAt(0).toUpperCase() + translated.slice(1);
    }

    return translated;
}

function translateText() {
    const text = textInput.value.trim();
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
        let i = 0;

        while (i < words.length) {

            // Try two-word phrases first
            if (i + 1 < words.length) {
                const firstWord = words[i].replace(/[.,!?]/g, "");
                const secondWord = words[i + 1].replace(/[.,!?]/g, "");

                const phrase = firstWord.toLowerCase() + " " + secondWord.toLowerCase();

                if (dictionary[phrase]) {
                let translatedPhrase = dictionary[phrase];

                translatedPhrase = matchCapitalization(
                    firstWord + " " + secondWord,
                    translatedPhrase
                );

                const punctuation = words[i + 1].match(/[.,!?]+$/);

                if (punctuation) {
                    translatedPhrase += punctuation[0];
                }

                translatedWords.push(translatedPhrase);

                i += 2;
                continue;
            }
            }

            // If no phrase was found, translate one word
            const originalWord = words[i];
            const cleanWord = originalWord.replace(/[.,!?]/g, "");
            const lookupWord = cleanWord.toLowerCase();

            if (dictionary[lookupWord]) {
                let translatedWord = dictionary[lookupWord];

                translatedWord = matchCapitalization(
                    cleanWord,
                    translatedWord
                );

                translatedWords.push(
                    originalWord.replace(cleanWord, translatedWord)
                );
            } else {
                translatedWords.push(originalWord);
            }

            i++;
        }

        translationResult.textContent = translatedWords.join(" ");
    } else {
        translationResult.textContent =
            "This translation combination is not available yet.";
    }
}

 
        const voiceButton = document.querySelector(".voice-button");
        const textInput = document.querySelector(".text-input");

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();

        const speechLanguages = {
            English: "en-US",
            Swahili: "sw-KE",
            French: "fr-FR",
            Spanish: "es-ES"
        };
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceButton.addEventListener("click", function() {
            const selectedLanguage = sourceLanguage.value;

            recognition.lang = speechLanguages[selectedLanguage];

            console.log("Speech language:", recognition.lang);
            console.log("Starting speech recognition...");

            recognition.start();
        });

        recognition.onstart = function() {
            console.log("Microphone is listening...");
            voiceButton.textContent = "🎙️ Listening...";
        };

        recognition.onresult = function(event) {
            const speechText = event.results[0][0].transcript;

            textInput.value = speechText;

            translateText();
        };

        recognition.onerror = function(event) {
            console.log("Speech recognition error:", event.error);
            voiceButton.textContent = "🎙️ Speak";
        };

        recognition.onend = function() {
            console.log("Speech recognition ended.");
            voiceButton.textContent = "🎙️ Speak";
        };

        function getVoiceForLanguage(languageCode) {
            return availableVoices.find(function(voice) {
                return voice.lang.toLowerCase().startsWith(languageCode.toLowerCase());
            });
        }
        
        const speechOutputLanguages = {
            English: "en",
            Swahili: "sw",
            French: "fr",
            Spanish: "es"
        };

        const speakOutputButton = document.querySelector(".speak-output-button");

        speakOutputButton.addEventListener("click", function() {
            const translatedText = translationResult.textContent;

            if (!translatedText) {
                return;
            }

            const selectedTargetLanguage = targetLanguage.value;
            const languageCode = speechOutputLanguages[selectedTargetLanguage];

            const speech = new SpeechSynthesisUtterance(translatedText);

            speech.lang = languageCode;

            const selectedVoice = getVoiceForLanguage(languageCode);

            if (selectedVoice) {
                speech.voice = selectedVoice;

                console.log("Using voice:", selectedVoice.name);
                console.log("Voice language:", selectedVoice.lang);
            } else {
                console.log("No matching voice found for:", languageCode);
                console.log("Using browser default voice.");
            }

            speechSynthesis.cancel();
            speechSynthesis.speak(speech);
        });

translateButton.addEventListener("click", translateText);

        let availableVoices = [];

        function loadVoices() {
            availableVoices = speechSynthesis.getVoices();

            console.log("Voices loaded:", availableVoices.length);
        }

        loadVoices();

        speechSynthesis.addEventListener("voiceschanged", loadVoices);





        function loadVoices() {
    availableVoices = speechSynthesis.getVoices();

    console.log("Voices loaded:", availableVoices.length);

    availableVoices.forEach(function(voice) {
        console.log(voice.name, "|", voice.lang);
    });
}