console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs = [];
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Updated getSongs function to fetch from songs.json
async function getSongs() {
    try {
        let response = await fetch("songs/songs.json"); // Fetch song list from JSON
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
                    <div>ALEX</div>
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
        console.error("Error fetching songs:", error);
    }
}

// Updated playMusic function with correct song path
const playMusic = (track, pause = false) => {
    currentSong.src = `songs/${track}`;  // Corrected file path
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

// Updated displayAlbums function to remove folder fetching (GitHub Pages does not support directory listing)
async function displayAlbums() {
    console.log("Displaying albums");
    let cardContainer = document.querySelector(".cardContainer");
    
    // Example album structure (if needed, you can manually add albums)
    let albums = [
        { folder: "lofi", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/lofi/cover.jpg" },
        { folder: "HappyHits", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/HappyHits/cover.jpg" },
        { folder: "Uplifting_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Uplifting_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Funky_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Funky_(mood)/cover.jpg" },
        { folder: "Dark_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Dark_(mood)/cover.jpg" },
        { folder: "Chill_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Chill_(mood)/cover.jpg" },
        { folder: "Bright_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Bright_(mood)/cover.jpg" },
        { folder: "Angry_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Angry_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "Love_(mood)", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/Love_(mood)/cover.jpg" },
        { folder: "lofi", title: "Alex Playlist", description: "Best of NoCopyrightSounds", cover: "songs/lofi/cover.jpg" }



    ];

    console.log(`Total albums to display: ${albums.length}`);

    cardContainer.innerHTML = ""; // Clear existing content

    albums.forEach(album => {
        cardContainer.innerHTML += `
            <div data-folder="${album.folder}" class="card">
                <div class="play">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                </div>
                <img src="${album.cover}" alt="">
                <h2>${album.title}</h2>
                <p>${album.description}</p>
            </div>
        `;
    });

    console.log("Albums rendered successfully!");

    // Attach event listeners
    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener("click", async () => {
            console.log(`Loading songs for: ${e.dataset.folder}`);
            await getSongs();
            if (songs.length > 0) {
                playMusic(songs[0]);
            }
        });
    });

    // Load playlist on card click
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs");
            await getSongs(); // Load from songs.json
            if (songs.length > 0) {
                playMusic(songs[0]);
            }
        });
    });
}

// Updated main function to load songs from songs.json
async function main() {
    await getSongs();
    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    await displayAlbums();

    // Attach event listeners for play/pause buttons
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Update song progress
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar functionality
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Hamburger menu
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Close sidebar menu
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Previous song button
    previous.addEventListener("click", () => {
        currentSong.pause();
        console.log("Previous clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Next song button
    next.addEventListener("click", () => {
        currentSong.pause();
        console.log("Next clicked");
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });

    // Volume control
    document.querySelector(".range input").addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100");
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume > img").src = "img/volume.svg";
        }
    });

    // Mute/unmute volume
    document.querySelector(".volume > img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = "img/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "img/volume.svg";
            currentSong.volume = 0.10;
            document.querySelector(".range input").value = 10;
        }
    });
}

// Start the application
main();
