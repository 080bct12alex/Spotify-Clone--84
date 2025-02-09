console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs = [];

async function getSongs() {
    try {
        let response = await fetch("songs/songs.json");
        let data = await response.json();
        songs = data.songs;

        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = ""; 

        // Display songs in the playlist
        songs.forEach(song => {
            let songItem = document.createElement("li");
            songItem.innerHTML = `
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            `;

            // Play song on click
            songItem.addEventListener("click", () => playMusic(song));
            songUL.appendChild(songItem);
        });
    } catch (error) {
        console.error("Error loading songs:", error);
    }
}

// Function to play a song
const playMusic = (track, pause = false) => {
    currentSong.src = `songs/${track}`;  // Corrected file path
    if (!pause) {
        currentSong.play();
        document.getElementById("play").src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

// Attach event listeners
document.getElementById("play").addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        document.getElementById("play").src = "img/pause.svg";
    } else {
        currentSong.pause();
        document.getElementById("play").src = "img/play.svg";
    }
});

// Load songs when the page loads
document.addEventListener("DOMContentLoaded", () => {
    getSongs();
});
