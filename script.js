// SHOW PASSWORD PAGE

function showPassword() {

    document
        .getElementById("cover")
        .classList.add("hidden");

    document
        .getElementById("passwordPage")
        .classList.remove("hidden");
}



// CHECK PASSWORD

function checkPassword() {

    const password =
        document
        .getElementById("passwordInput")
        .value
        .trim()
        .toLowerCase();

    if (password === "hogwarts") {

        document
            .getElementById("passwordPage")
            .classList.add("hidden");

        document
            .getElementById("questionPage")
            .classList.remove("hidden");

    } else {

        alert(
            "The manuscript remains sealed."
        );
    }
}



// CHECK ANSWER

function checkAnswer() {

    const answer =
        document
        .getElementById("answerInput")
        .value
        .trim()
        .toLowerCase();

    if (
        answer === "hawty cafe" ||
        answer === "hawty"
    ) {

        document
            .getElementById("questionPage")
            .classList.add("hidden");

        document
            .getElementById("chapterPage")
            .classList.remove("hidden");

    } else {

        alert(
            "The map refuses to reveal its secrets."
        );
    }
}
