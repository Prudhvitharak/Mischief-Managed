/* ===================================
   PASSWORD UNLOCK
=================================== */

const unlockBtn =
document.getElementById("unlockBtn");

const error =
document.getElementById("error");

unlockBtn.addEventListener(
    "click",
    () => {

        const password =
        document.getElementById("password")
        .value
        .trim()
        .toLowerCase();

        if(
            password ===
            "mischief managed"
        ){

            revealSite();

        }else{

            error.innerText =
            "Wrong spell. Try again.";

        }
    }
);

/* ===================================
   MICROPHONE SPELL
=================================== */

const micBtn =
document.getElementById("micBtn");

const spellStatus =
document.getElementById("spellStatus");

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;

    micBtn.addEventListener(

        "click",

        ()=>{

            spellStatus.innerText =
            "Listening...";

            recognition.start();

        }
    );

    recognition.onresult =
    (event)=>{

        const spell =
        event.results[0][0]
        .transcript
        .toLowerCase();

        console.log(
            "Detected:",
            spell
        );

        if(
            spell.includes(
                "mischief managed"
            )
        ){

            spellStatus.innerText =
            "Spell Accepted ✨";

            revealSite();

        }else{

            spellStatus.innerText =
            "Wrong Spell. Try Again.";

        }
    };

    recognition.onerror =
    ()=>{

        spellStatus.innerText =
        "Microphone Error";

    };

}else{

    spellStatus.innerText =
    "Speech Recognition not supported";

}

/* ===================================
   FADE + OPEN MAIN PAGE
=================================== */

function revealSite(){

    document.body.classList.add(
        "fade"
    );

    setTimeout(()=>{

        window.location.href =
        "main.html";

    },1500);
}
