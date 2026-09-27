const unlockBtn =
document.getElementById("unlockBtn");

unlockBtn.addEventListener(
    "click",
    () => {

        const password =
        document.getElementById("password")
        .value
        .trim();

        if(password === "0.32"){

            document.body.classList.add(
                "fade"
            );

            setTimeout(()=>{

                window.location.href =
                "main.html";

            },1500);

        }
        else{

            document.getElementById("error")
            .innerText =
            "Wrong spell. Try again.";

        }
    }
);
