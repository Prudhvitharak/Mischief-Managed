const unlockBtn =
document.getElementById("unlockBtn");

unlockBtn.addEventListener(
    "click",
    () => {

        const password =
        document.getElementById("password")
        .value
        .trim();

        if(password === "Mischief Managed"){

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
