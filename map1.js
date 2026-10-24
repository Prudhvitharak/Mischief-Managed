
const chapterLinks = {
    juliee: "chapter1.html",
    grass: "chapter2.html",
    transit: "chapter3.html",
    flight: "chapter4.html"
};

// Open the relevant diary page when a map spot is tapped
document.querySelectorAll(".spot").forEach(spot => {
    spot.addEventListener("click", event => {
        event.preventDefault();

        const chapter = [...spot.classList]
            .map(name => chapterLinks[name])
            .find(Boolean);

        if (!chapter) return;

        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = chapter;
        }, 300);
    });
});

// Keep the Next button working
document.getElementById("nextBtn").addEventListener("click", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "map2.html";
    }, 300);
});
