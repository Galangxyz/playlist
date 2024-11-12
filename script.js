// Dapatkan elemen
const popupProfile = document.getElementById("popupProfile");
const closePopupBtn = document.getElementById("closePopupBtn");

// Menampilkan pop-up saat halaman dimuat
window.onload = function () {
    popupProfile.style.display = "flex";
};

// Fungsi untuk menutup pop-up
closePopupBtn.onclick = function () {
    popupProfile.style.display = "none";
};

// Menutup pop-up jika user mengklik di luar konten pop-up
window.onclick = function (event) {
    if (event.target === popupProfile) {
        popupProfile.style.display = "none";
    }
};
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
    {
        title: "End Of Beginning",
        name: "Joe Keery (Tiktok Version)",
        source: "https://galangxyz.github.io/website/Djo_-_End_of_Beginning__TikTok_Version_(128k).mp3"
    },
    {
        title: "I Wanna Be Your X ilomilo",
        name: "Arctic Monkeys/Billie Eilish",
        source: "https://galangxyz.github.io/website/wanna.mp3"
    },
    {
        title: "Traitor",
        name: "Olivia Rodrigo",
        source: "https://galangxyz.github.io/website/traitor.mp3"
    },
    {
        title: "Cardigan X I Wanna Be Your",
        name: "Taylor Swift/ArticMonkeys",
        source: "https://galangxyz.github.io/website/taylor.mp3"
    },
    {
        title: "Камин",
        name: "EMIN JONY",
        source: "https://galangxyz.github.io/website/kamin.mp3"
    },

    {
        title: "Fix You",
        name: "Coldplay",
        source: "https://galangxyz.github.io/website/fixyou.mp3"
    },
    {
        title: "Nice Dream",
        name: "Radiohead",
        source: "https://galangxyz.github.io/website/nicedream.mp3"
    }
];

let currentSongIndex = 3;

function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;

    song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
});

song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
    currentSongIndex = (swiper.activeIndex + 1) % songs.length;
    updateSongInfo();
    swiper.slideTo(currentSongIndex);
    playSong();
});

function pauseSong() {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
}

function playSong() {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}

function playPause() {
    if (song.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
    song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
    playSong();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    centeredSlides: true,
    initialSlide: 3,
    slidesPerView: "auto",
    grabCursor: true,
    spaceBetween: 40,
    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 50,
        modifier: 1,
        slideShadows: false
    },
    navigation: {
        nextEl: ".forward",
        prevEl: ".backward"
    }
});

swiper.on("slideChange", () => {
    currentSongIndex = swiper.activeIndex;
    updateSongInfo();
    playPause();
});
