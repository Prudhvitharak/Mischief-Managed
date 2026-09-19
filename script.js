function openBook(){

    alert(
`Welcome, Traveller.

Only those who know the story may continue.

Mischief Managed.`
    );

    document.body.classList.add("fade-out");

    setTimeout(() => {

        window.location.href = "map.html";

    }, 1000);
}
