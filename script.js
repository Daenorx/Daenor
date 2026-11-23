
const searchInput = document.getElementById("searchInput");
const tracks = document.querySelectorAll(".track");
const playButtons = document.querySelectorAll(".play");

let currentAudio = new Audio();
let currentButton = null;

// Search music
searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();

    tracks.forEach(track => {
        const title = track.querySelector("h3").textContent.toLowerCase();
        const category = track.querySelector("p").textContent.toLowerCase();

        const isMatch =
            title.includes(searchText) ||
            category.includes(searchText);

        track.style.display = isMatch ? "block" : "none";
    });
});

// Play and pause music
playButtons.forEach(button => {
    button.addEventListener("click", function () {

        const musicFile = this.dataset.src;

        // Pause current song
        if (currentButton === this && !currentAudio.paused) {
            currentAudio.pause();
            this.textContent = "▶ Play";
            return;
        }

        // Reset previous button
        if (currentButton) {
            currentButton.textContent = "▶ Play";
        }

        // Play selected song
        if (currentButton !== this || currentAudio.src !== new URL(musicFile, document.baseURI).href) {
            currentAudio.pause();
            currentAudio = new Audio(musicFile);
        }

        currentButton = this;

        this.textContent = "⏳ Loading...";

        currentAudio.play()
            .then(() => {
                this.textContent = "Ⅱ Pause";
            })
            .catch(error => {
                this.textContent = "▶ Play";
                alert("Music could not be played. Please check the MP3 file name.");
                console.error(error);
            });

        currentAudio.onended = () => {
            this.textContent = "▶ Play";
            currentButton = null;
        };
    });
});
