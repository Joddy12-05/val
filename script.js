const app = document.getElementById("app");
let noCount = 0;
let noPosX = 0;
let noPosY = 0;

const sadGifs = [
    "images/sad1.webp",
    "images/sad2.webp",
    "images/sad3.webp",
    "images/sad4.webp",
    "images/sad45.webp",
    "images/sad45.webp"
];

/* PAGE 1 */
function showLovePage() {
const yesScale = 1 + (noCount * 0.2);
const noScale = Math.max(0.2, 1 - (noCount * 0.15));

if (noCount === 0) {
    app.innerHTML = `
    <div class="side-layout">
        <div class="card">
            <h1><i>HARSHU💕</h1>
            <p><b>Will you be my Valentine?</i></p>
            <button id="yes" onclick="yesClicked()">Yes 💖</button>
            <button id="no" onclick="noClicked()">No 😢</b></button>
        </div>

        <div class="gif-side">
            <img src="images/first.gif">
        </div>
    </div>
    `;
    return;
}

const gifIndex = (noCount - 1) % sadGifs.length;
const currentGif = sadGifs[gifIndex];

app.innerHTML = `
<div class="side-layout">

    <div class="card" style="position:relative; height:230px;">
        <h1>HARSHU💕</h1>
        <p>Will you be my Valentine?</p>

        <button id="yes" 
            style="transform: scale(${yesScale}); z-index:2; position:relative;"
            onclick="yesClicked()">
            Yes 💖
        </button>

        <button id="no" 
            style="
                position:absolute;
                left:${noPosX}px;
                top:${noPosY}px;
                transform: scale(${noScale});
                z-index:1;
            "
            onclick="noClicked()">
            No 😢
        </button>
    </div>

    <div class="gif-side">
        <img src="${currentGif}">
    </div>

</div>
`;
}

/* PAGE 2 */
function showGifts() {
app.innerHTML = `
<div class="side-layout">
    <div class="card gift-area">
        <h1><i>Choose a Gift! bacchu❤️</i></h1>
        <div class="gifts-row">
            <img class="gift-img" src="images/gift.png" onclick="showNote()">
            <img class="gift-img" src="images/gift.png" onclick="showMusic()">
        </div>
    </div>

    <div class="gif-side">
        <img src="images/happy.webp">
    </div>
</div>
`;
}

/* NOTE PAGE */
function showNote() {
app.innerHTML = `
<div class="bears">
    <img class="bear-img" src="images/love.webp">

    <div class="card">
        <div class="slideshow">
            <img src="images/photo6.jpg" width="120">
            <img src="images/photo2.jpg" width="120">
        </div>

        <h1><b><u>For You ❤️</b></u></h1>
        <p style="font-size:15px;">
            <i><b>I just want you to know how grateful I am to have you in my life.  
            You bring happiness, warmth, and love into my world in ways I never imagined.  
            Every smile of yours makes my day brighter, and every moment with you feels special.  
            Thank you for being YOU, and for choosing me.  
            I promise to always care for you, respect you, and love you with all my heart. 💕<br>
            i'll always love you my cute little princess🧿.</i></b>
        </p>

        <button class="go-back" onclick="showGifts()">Go Back</button>
    </div>

    <img class="bear-img" src="images/bear2.webp">
</div>
`;
}

/* MUSIC PAGE */
function showMusic() {
app.innerHTML = `
<div class="music-layout">
    
    <div class="music-card">
        <img class="album-art" src="images/photo100.jpeg">
        <div class="track-title">Track of Love🧿💕</div>

        <div class="player-bar">
            <div class="play-btn" id="playBtn">▶</div>
            <div class="time" id="time">0:00 / 0:00</div>
            <div class="progress">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>

        <audio id="song">
            <source src="song/song1.m4a" type="audio/mpeg">
        </audio>

        <button class="go-back" onclick="showGifts()">Go Back</button>
    </div>

    <img class="bear-img" src="images/bear2.webp">
</div>
`;
setupPlayer();
}

function sparkleShower() {
    for (let i = 0; i < 30; i++) {
        const s = document.createElement("div");
        s.className = "sparkle";
        s.innerHTML = "✨";
        s.style.left = Math.random() * 100 + "vw";
        s.style.fontSize = (12 + Math.random() * 18) + "px";
        s.style.animationDuration = (2 + Math.random() * 2) + "s";

        document.body.appendChild(s);
        setTimeout(() => s.remove(), 4000);
    }
}

function noClicked() {
    noCount++;

    if (noCount > 6) {
        noPosX = 120;
        noPosY = 100;
        showLovePage();
        return;
    }

    noPosX = Math.random() * 180;
    noPosY = 90 + Math.random() * 80;
    showLovePage();
}
 
function yesClicked() {
    sparkleShower();
    setTimeout(() => {
        showGifts();
    }, 800);
}

/* PLAYER LOGIC */
function setupPlayer() {
const song = document.getElementById("song");
const playBtn = document.getElementById("playBtn");
const fill = document.getElementById("progressFill");
const time = document.getElementById("time");

if (!song || !playBtn) return;

playBtn.onclick = () => {
    if (song.paused) {
        song.play();
        playBtn.innerHTML = "⏸";
    } else {
        song.pause();
        playBtn.innerHTML = "▶";
    }
};

song.ontimeupdate = () => {
    const current = formatTime(song.currentTime);
    const total = formatTime(song.duration);
    time.innerText = current + " / " + total;
    const percent = (song.currentTime / song.duration) * 100;
    fill.style.width = percent + "%";
};
}

function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" + s : s);
}

/* START */
showLovePage();
