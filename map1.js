document
.getElementById("nextBtn")
.addEventListener(
    "click",
    () => {

        document.body.style.opacity =
        "0";

        setTimeout(
            () => {

                window.location.href =
                "map2.html";

            },
            500
        );

    }
);
