const span_days = document.getElementById("days");
const span_hours = document.getElementById("hours");
const span_minutes = document.getElementById("minutes");
const span_seconds = document.getElementById("seconds");

const div_box = document.getElementById("box");

const div_pl = document.getElementById("pl");

//#region birthday counter
const target_date = new Date(2026, 10, 22, 0, 0, 0);

function recharge() {
    const now = new Date();
    const difference = target_date - now;

    if (difference <= 0) {
        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference / 3600000) % 24);
    const minutes = Math.floor((difference / 60000) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    span_days.textContent = `${days}d`;
    span_hours.textContent = `${hours}h`;
    span_minutes.textContent = `${minutes}m`;
    span_seconds.textContent = `${seconds}s`;
}

recharge();
setInterval(recharge, 1000);
//#endregion


div_pl.addEventListener("click", () => {
    window.location.href = "lovi/index.html"
});
