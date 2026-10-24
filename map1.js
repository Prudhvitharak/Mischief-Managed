
const memories = {
    juliee: {
        title: "Juliee to Juhi",
        text: "Your first memory goes here..."
    },

    grass: {
        title: "Grass and Gossips",
        text: "Your second memory goes here..."
    },

    transit: {
        title: "Transit and Talks",
        text: "Your third memory goes here..."
    },

    flight: {
        title: "Flabbergasted Flight",
        text: "Your fourth memory goes here..."
    }
};

// Open a memory when a map location is tapped
document.querySelectorAll(".spot").forEach(spot => {
    spot.addEventListener("click", () => {
        const memory = memories[spot.dataset.memory];

        if (!memory) return;

        document.getElementById("memoryTitle").textContent =
            memory.title;

        document.getElementById("memoryText").textContent =
            memory.text;

        document.getElementById("memoryModal").classList.remove("hidden");
    });
});

// Close the memory popup
function closeMemory() {
    document.getElementById("memoryModal").classList.add("hidden");
}

document.getElementById("closeBtn").addEventListener("click", closeMemory);
document.getElementById("backBtn").addEventListener("click", closeMemory);

// Close popup when tapping outside the diary
document.getElementById("memoryModal").addEventListener("click", event => {
    if (event.target.id === "memoryModal") {
        closeMemory();
    }
});

// Keep your existing Next button functionality
document.getElementById("nextBtn").addEventListener("click", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "map2.html";
    }, 500);
});
