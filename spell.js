/* ===================================
   ELEMENTS
=================================== */

const unlockBtn =
document.getElementById("unlockBtn");

const passwordInput =
document.getElementById("password");

const errorText =
document.getElementById("error");

const micBtn =
document.getElementById("micBtn");

const spellStatus =
document.getElementById("spellStatus");

/* ===================================
   REVEAL SITE
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

/* ===================================
   PASSWORD UNLOCK
=================================== */

unlockBtn.addEventListener(
    "click",
    ()=>{

        const password =
        passwordInput.value
        .trim()
        .toLowerCase();

        if(
            password ===
            "mischief managed"
        ){

            revealSite();

        }else{

            errorText.innerText =
            "Wrong spell. Try again.";

        }
    }
);

/* ===================================
   MICROPHONE UNLOCK
=================================== */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(!SpeechRecognition){

    spellStatus.innerText =
    "Speech Recognition not supported";

}else{

    const recognition =
    new SpeechRecognition();

    recognition.lang =
    "en-US";

    recognition.interimResults =
    false;

    recognition.continuous =
    false;

    micBtn.addEventListener(

        "click",

        ()=>{

            errorText.innerText = "";

            spellStatus.innerText =
            "Listening...";

            try{

                recognition.start();

            }catch(err){

                console.log(err);

            }
        }
    );

    recognition.onstart = ()=>{

        spellStatus.innerText =
        "Speak now...";
    };

    recognition.onresult = (event)=>{

        const spokenText =
        event.results[0][0]
        .transcript
        .toLowerCase();

        console.log(
            "Detected:",
            spokenText
        );

        spellStatus.innerText =
        "Heard: " + spokenText;

        if(
            spokenText.includes(
                "mischief managed"
            )
        ){

            spellStatus.innerText =
            "Spell Accepted ✨";

            setTimeout(()=>{

                revealSite();

            },700);

        }else{

            spellStatus.innerText =
            "Wrong Spell. Try Again.";
        }
    };

    recognition.onerror =
    (event)=>{

        spellStatus.innerText =
        "Error: " +
        event.error;

        console.error(
            event.error
        );
    };

    recognition.onend =
    ()=>{

        console.log(
            "Recognition ended"
        );
    };
}
