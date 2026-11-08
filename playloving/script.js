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
const album_icon =[
    "albums/album_sunrise.jpg",
    "albums/album_sunset.jpg",
    "albums/album_defaul.jpg"
]

let select = false;

albums.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (select) return;
        select = true;

        album.src = album_icon[index];
        album_menu.classList.remove("show");

        background.classList.remove("sunrise", "sunset", "dusk");

        switch(index) {
            case 0:
                background.classList.add("sunrise");
                break;

            case 1:
                background.classList.add("sunset");
                break;
                
            case 2:
                background.classList.add("dusk");
                break;
        }
    });
});
//#endregion


const bt_play = document.querySelector("#playback button:nth-child(2)");

let playing_music = false;

bt_play.addEventListener("click", () => {
    bt_play.classList.toggle("playing");
    playing_music = !playing_music;
    console.log(playing_music);
});


const playback = document.getElementById("playback");
const progress = document.getElementById("line");

document.documentElement.style.setProperty("--min-width", `${playback.getBoundingClientRect().width}px`);