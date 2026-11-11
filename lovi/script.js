
const bg = document.getElementById("background");

const select_album = document.getElementById("select-album");
const album_menu = document.getElementById("album-menu");

const album_icon = document.getElementById("album-icon");

const songs = document.querySelectorAll("#songs p");

const arrow_left = document.getElementById("arrow-left");
const arrow_right = document.getElementById("arrow-right");

const play = document.querySelector("#playback button:nth-child(2)");
const previous = document.querySelector("#playback button:nth-child(1)");
const next = document.querySelector("#playback button:nth-child(3)");

const progress = document.getElementById("progress");
const line = document.getElementById("line");
const time_labels = progress.querySelectorAll("span");

//#region albums

const albums = {
    defaul: {
        name: "Defaul",
        image: "albums/album_defaul.jpg",
        bg: "rgba(255, 255, 255, 0)",
        songs: [],
        songs_: []
    },

    sunrise: {
        name: "Sunrise",
        image: "albums/album_sunrise.jpg",
        bg: "rgba(244, 162, 97, 0.33)",
        songs: [
            "|This Is What Falling In Love Feels Like | JVKE",
            "|See You Again | Tyler, The Creator & Kali Uchis",
            "|Cicada | Good Kid",
            "|No. 1 Party Anthem | Arctic Monkeys",
            "|Until I Found You | Stephen Sanchez",
            "|Her | JVKE"
        ],
        songs_: [
            "songs/sunrise/sg_tiwfilf.mp3",
            "songs/sunrise/sg_sya.mp3",
            "songs/sunrise/sg_cicada.mp3",
            "songs/sunrise/sg_n1pa.mp3",
            "songs/sunrise/sg_uify.mp3",
            "songs/sunrise/sg_her.mp3"
        ]
    },

    sunset: {
        name: "Sunset",
        image: "albums/album_sunset.jpg",
        bg: "rgba(199, 107, 120, 0.33)",
        songs: [
            "|Next To You | JVKE",
            "|Si Supieras Lo Que Siento Con Mirarte | Gonzalo Ávila",
            "|I Wanna Be Yours | Arctic Monkeys",
            "|Tu Rostro | Nasa Histoires",
            "|Doma | Jósean Log",
            "|Besos, Limón y Miel | Santi Muk"
        ],
        songs_: [
            "songs/sunset/sg_nty.mp3",
            "songs/sunset/sg_sslqscm.mp3",
            "songs/sunset/sg_iwby.mp3",
            "songs/sunset/sg_tr.mp3",
            "songs/sunset/sg_doma.mp3",
            "songs/sunset/sg_blm.mp3"
        ]
    },

    dusk: {
        name: "Dusk",
        image: "albums/album_defaul.jpg",
        bg: "rgba(52, 58, 99, 0.33)",
        songs: [
            "|Catorce | Sebastian Romero",
            "|No Time To Explain | Good Kid",
            "|Si Hay Algo | Jósean Log",
            "|Amtrak | Los Retros",
            "|Señor Tic Tac | Nasa Histoires",
            "|Make You Mine | PUBLIC"
        ],
        songs_: [
            "songs/dusk/sg_catorce.mp3",
            "songs/dusk/sg_ntte.mp3",
            "songs/dusk/sg_sha.mp3",
            "songs/dusk/sg_amtrak.mp3",
            "songs/dusk/sg_stt.mp3",
            "songs/dusk/sg_mym.mp3"
        ]
    }
};

//#endregion

//#region variables

const album_names = ["sunrise", "sunset", "dusk"];

let current_album = -1;
let current_song = 0;

let current_audio = null;

let playing_music = false;

// Crear el reproductor de audio
const audio = new Audio();
audio.preload = "metadata";

// Crear la imagen del selector si todavía no existe
let select_album_img = select_album.querySelector("img");

if (!select_album_img) {
    select_album_img = document.createElement("img");
    select_album.appendChild(select_album_img);
}

select_album_img.src = albums.defaul.image;

//#endregion

//#region album menu

select_album.addEventListener("click", () => {
    album_menu.classList.toggle("show");
});

const album_item = document.querySelectorAll(".album-item");

album_item.forEach((button, index) => {
    button.addEventListener("click", () => {
        change_album(index);
        album_menu.classList.remove("show");
    });
});

//#endregion

//#region change playlist

function change_album(index) {
    if (index < 0 || index >= album_names.length) return;

    const was_playing = playing_music;

    current_album = index;
    current_song = 0;

    const selected_album = albums[album_names[current_album]];

    // Actualizar las portadas
    album_icon.src = selected_album.image;
    select_album_img.src = selected_album.image;

    // Actualizar el fondo
    bg.style.setProperty("--overlay", selected_album.bg);

    // Actualizar los nombres de las canciones
    songs.forEach((p, index) => {
        p.textContent = `0${index + 1}    ${selected_album.songs[index]}`;
    });

    // Cargar la primera canción
    load_song(was_playing);
}

function next_album() {
    let next_index = current_album + 1;

    if (next_index >= album_names.length) {
        next_index = 0;
    }

    change_album(next_index);
}

function previous_album() {
    let previous_index = current_album - 1;

    if (previous_index < 0) {
        previous_index = album_names.length - 1;
    }

    change_album(previous_index);
}

//#endregion

//#region song selection

function update_song() {
    if (current_album === -1) return;

    const selected_album = albums[album_names[current_album]];

    current_audio = selected_album.songs_[current_song];

    // Marcar la canción seleccionada
    songs.forEach((p, index) => {
        p.classList.toggle("show", index === current_song);
    });
}

function load_song(autoplay = false) {
    if (current_album === -1) return;

    update_song();

    // Cargar el archivo MP3
    audio.src = current_audio;
    audio.load();

    update_progress();
    update_time();

    if (autoplay) {
        play_music();
    } else {
        pause_music();
    }
}

function next_song() {
    if (current_album === -1) return;

    const selected_album = albums[album_names[current_album]];

    current_song++;

    if (current_song >= selected_album.songs_.length) {
        current_song = 0;
    }

    load_song(playing_music);
}

function previous_song() {
    if (current_album === -1) return;

    const selected_album = albums[album_names[current_album]];

    current_song--;

    if (current_song < 0) {
        current_song = selected_album.songs_.length - 1;
    }

    load_song(playing_music);
}

// Seleccionar una canción tocando su nombre
songs.forEach((p, index) => {
    p.addEventListener("click", () => {
        if (current_album === -1) return;

        current_song = index;

        load_song(true);
    });
});

//#endregion

//#region playback

function play_music() {
    if (current_album === -1) return;

    audio.play()
        .then(() => {
            playing_music = true;
            play.classList.add("playing");
        })
        .catch(error => {
            console.error("Error al reproducir:", error);
        });
}

function pause_music() {
    audio.pause();

    playing_music = false;
    play.classList.remove("playing");
}

play.addEventListener("click", () => {
    if (current_album === -1) return;

    if (audio.paused) {
        play_music();
    } else {
        pause_music();
    }
});

// Botones anterior y siguiente
previous.addEventListener("click", () => {
    previous_song();
});

next.addEventListener("click", () => {
    next_song();
});

// Cuando termina una canción
audio.addEventListener("ended", () => {
    next_song();
});

// Sincronizar el botón con el estado real del audio
audio.addEventListener("play", () => {
    playing_music = true;
    play.classList.add("playing");
});

audio.addEventListener("pause", () => {
    playing_music = false;
    play.classList.remove("playing");
});

//#endregion

//#region progress bar

function format_time(seconds) {
    if (!isFinite(seconds) || seconds < 0) {
        return "-:--";
    }

    const minutes = Math.floor(seconds / 60);
    const remaining_seconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remaining_seconds).padStart(2, "0")}`;
}

function update_time() {
    time_labels[0].textContent = format_time(audio.currentTime);
    time_labels[1].textContent = format_time(audio.duration);
}

function update_progress() {
    let percentage = 0;

    if (audio.duration && isFinite(audio.duration)) {
        percentage = (audio.currentTime / audio.duration) * 100;
    }

    line.style.background = `
        linear-gradient(
            to right,
            white ${percentage}%,
            #4d4d4d ${percentage}%
        )
    `;
}

audio.addEventListener("timeupdate", () => {
    update_progress();
    update_time();
});

audio.addEventListener("loadedmetadata", () => {
    update_progress();
    update_time();
});

audio.addEventListener("durationchange", () => {
    update_progress();
    update_time();
});

// Buscar una posición de la canción al tocar la barra
line.addEventListener("click", (event) => {
    if (!audio.duration || !isFinite(audio.duration)) return;

    const rect = line.getBoundingClientRect();

    const position = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, position / rect.width));

    audio.currentTime = percentage * audio.duration;
});

//#endregion

//#region arrow animation

function anim_arrow(arrow) {
    arrow.classList.remove("active");

    void arrow.offsetWidth;

    arrow.classList.add("active");

    setTimeout(() => {
        arrow.classList.remove("active");
    }, 150);
}

// Las flechas cambian de playlist
arrow_left.addEventListener("click", () => {
    anim_arrow(arrow_left);
    previous_album();
});

arrow_right.addEventListener("click", () => {
    anim_arrow(arrow_right);
    next_album();
});

//#endregion

//#region audio errors

audio.addEventListener("error", () => {
    if (current_album !== -1) {
        console.error("No se pudo cargar el archivo:", current_audio);
    }
});

//#endregion
