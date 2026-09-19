function showPassword(){

    document.getElementById("cover").classList.add("hidden");

    document
        .getElementById("passwordPage")
        .classList.remove("hidden");
}

function checkPassword(){

    const password =
        document.getElementById("passwordInput")
        .value;

    if(password.toLowerCase() === "hogwarts"){

        document
            .getElementById("passwordPage")
            .classList.add("hidden");

        document
            .getElementById("questionPage")
            .classList.remove("hidden");
    }

    else{

        alert("The manuscript remains sealed.");
    }
}

function checkAnswer(){

    const answer =
        document.getElementById("answerInput")
        .value;

    if(answer.toLowerCase() === "hawty cafe"){

        document
            .getElementById("questionPage")
            .classList.add("hidden");

        document
            .getElementById("chapterPage")
            .classList.remove("hidden");
    }

    else{

        alert("The map refuses to reveal its secrets.");
    }
}