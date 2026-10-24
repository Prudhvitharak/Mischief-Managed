
/* ===================================
   ELEMENTS
=================================== */

const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("password");
const errorText = document.getElementById("error");
const micBtn = document.getElementById("micBtn");
const spellStatus = document.getElementById("spellStatus");

const loadingScreen = document.getElementById("loadingScreen");

/* ===================================
   REVEAL SITE WITH MAGIC TRANSITION
=================================== */

let isRevealing = false;

function revealSite() {

    // Prevent multiple clicks or repeated triggers
    if (isRevealing) return;

    isRevealing = true;

    // Hide errors and disable buttons
    errorText.innerText = "";
    unlockBtn.disabled = true;
    micBtn.disabled = true;
    passwordInput.disabled = true;

    // Fade away the parchment page
    document.body.classList.add("leaving");

    // Show the magical loading screen
    if (loadingScreen) {
        loadingScreen.classList.add("active");
    }

    // Navigate after the animation
    setTimeout(() => {

        window.location.href = "index.html";

    }, 2500);
}

/* ===================================
   PASSWORD UNLOCK
=================================== */

unlockBtn.addEventListener("click", () => {

    if (isRevealing) return;

    const password = passwordInput.value
        .trim()
        .toLowerCase();

    if (password === "mischief managed") {

        revealSite();

    } else {

        errorText.innerText = "Wrong spell. Try again.";
    }
});

// Allow Enter key to submit the password
passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        unlockBtn.click();
    }
});

/* ===================================
   MICROPHONE UNLOCK
=================================== */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    spellStatus.innerText =
        "Speech recognition is not supported in this browser. Please enter the password.";

    micBtn.disabled = true;

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    /* Start listening */
    micBtn.addEventListener("click", () => {

        if (isRevealing) return;

        errorText.innerText = "";
        spellStatus.innerText = "Listening...";

        try {

            recognition.start();

        } catch (err) {

            spellStatus.innerText =
                "Please wait a moment and try again.";

            console.log("Recognition start:", err);
        }
    });

    /* Microphone started */
    recognition.onstart = () => {

        spellStatus.innerText = "Speak now...";

    };

    /* Check spoken words */
    recognition.onresult = (event) => {

        const spokenText = event.results[0][0]
            .transcript
            .trim()
            .toLowerCase();

        console.log("Detected:", spokenText);

        spellStatus.innerText = "Heard: " + spokenText;

        if (spokenText.includes("mischief managed")) {

            spellStatus.innerText = "Spell Accepted ✨";

            setTimeout(() => {

                revealSite();

            }, 700);

        } else {

            spellStatus.innerText =
                "Wrong spell. Try again.";

        }
    };

    /* Handle microphone errors */
    recognition.onerror = (event) => {

        if (isRevealing) return;

        console.error("Speech recognition error:", event.error);

        if (event.error === "not-allowed") {

            spellStatus.innerText =
                "Microphone access denied. Please allow microphone access or enter the password.";

        } else if (event.error === "no-speech") {

            spellStatus.innerText =
                "I couldn't hear you. Please try again.";

        } else if (event.error === "network") {

            spellStatus.innerText =
                "Network error. Please try the password instead.";

        } else {

            spellStatus.innerText =
                "Couldn't hear the spell. Please try again.";
        }
    };

    /* Recognition ended */
    recognition.onend = () => {

        console.log("Speech recognition ended");

    };
}
