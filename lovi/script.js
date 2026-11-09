const background = document.getElementById("background");

const select_album = document.getElementById("select-album");
const album_menu = document.getElementById("album-menu");

select_album.addEventListener("click", () => {
    album_menu.classList.toggle("show");
    select = false;
});

//#region select album
const albums = document.querySelectorAll(".album-item");
const album = document.getElementById("album-icon");

const album_icon = [
    "albums/album_sunrise.jpg",
    "albums/album_sunset.jpg",
    "albums/album_defaul.jpg"
];

const songs = document.querySelectorAll("#songs p");

const song_names = {
    sunrise: [
        "This Is What Falling In Love Feels Like | JVKE",
        "See You Again | Tyler, The Creator & Kali Uchis",
        "Cicada | Good Kid",
        "The Look Of Love | Arctic Monkeys",
        "Until I Found You | Stephen Sanchez",
        "Her | JVKE"
    ],

    sunset: [
        "Next To You | JVKE",
        "Si Supieras Lo Que Siento Con Mirarte | Gonzalo Ávila",
        "Nuestra Canción | Monsieur Periné",
        "Tu Rostro | Nasa Histoires",
        "Doma | Jósean Log",
        "Besos, Limón y Miel | Santi Muk"
    ],

    dusk: [
        "Catorce | Sebastian Romero",
        "No Time To Explain | Good Kid",
        "Si Hay Algo | Jósean Log",
        "Amtrak | Los Retros",
        "Señor Tic Tac | Nasa Histoires",
        "Make You Mine | PUBLIC"
    ]
};

const album_names = ["sunrise", "sunset", "dusk"];

let select = false;

albums.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (select) return;
        select = true;

        const b_img = button.querySelector("img");
        const select_img = select_album.querySelector("img");

        select_img.src = b_img.src;

        album.src = album_icon[index];
        album_menu.classList.remove("show");

        background.classList.remove("sunrise", "sunset", "dusk");
        background.classList.add(album_names[index]);

        const selected_songs = song_names[album_names[index]];

        songs.forEach((song, i) => {
            song.textContent =
                `${String(i + 1).padStart(2, "0")}    | ${selected_songs[i]}`;
        });
    });
});
//#endregion


const bt_play = document.querySelector("#playback button:nth-child(2)");

let playing_music = false;

bt_play.addEventListener("click", () => {
    bt_play.classList.toggle("playing");
    playing_music = !playing_music;
});


const playback = document.getElementById("playback");
const progress = document.getElementById("line");

document.documentElement.style.setProperty("--min-width", `${playback.getBoundingClientRect().width}px`);