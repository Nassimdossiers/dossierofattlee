let player = null;
let ready = false;

/* music per tab (MP3 FILES NOW) */
const tracks = {
    profile: "ACROSSTHEDESERT_001738339.mp3",
    gallery: "JOURNEY_001320132.mp3",
    telemetry: "CIANOTIPO.mp3",
    lore: "DARKLINE.mp3",
    network: "AfterTheRain.mp3"
};

/* create audio player instead of YouTube */
document.addEventListener("DOMContentLoaded", () => {
    player = new Audio(tracks.profile);
    player.loop = true;
    player.volume = 0.4; // default 40%
    ready = true;

    // animate telemetry on load
    animateTelemetry();
});

/* unlock audio after first interaction (for mobile autoplay rules) */
document.addEventListener("click", unlock, { once: true });
document.addEventListener("touchstart", unlock, { once: true });

function unlock() {
    if (!player) return;
    player.play().then(() => {
        player.pause();
    }).catch(() => {});
}

/* ---------- TAB SYSTEM (unchanged structure) ---------- */

function openTab(evt, name) {

    /* switch content FIRST — always works */
    document.querySelectorAll(".tabcontent").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    const tab = document.getElementById(name);
    if (tab) tab.classList.add("active");
    evt.currentTarget.classList.add("active");

    /* music SECOND */
    changeMusic(name);
}

/* ---------- MUSIC SYSTEM (MP3 VERSION) ---------- */

function changeMusic(name) {
    if (!player || !ready) return;

    if (!tracks[name]) return;

    fadeTo(0, () => {
        player.src = tracks[name];
        player.play().catch(() => {});
        setTimeout(() => fadeTo(40), 200);
    });
}

function fadeTo(target, callback) {
    if (!player) return;

    let v = Math.round(player.volume * 100);
    let step = target > v ? 2 : -2;

    let i = setInterval(() => {
        v += step;
        player.volume = Math.max(0, Math.min(1, v / 100));

        if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
            clearInterval(i);
            if (callback) callback();
        }
    }, 40);
}

/* ---------- RELATIONSHIP LOG ---------- */

function toggleLog(button) {
    const log = button.nextElementSibling;
    log.style.display = log.style.display === "block" ? "none" : "block";
}

/* ---------- TELEMETRY ---------- */

function animateTelemetry() {
    document.querySelectorAll('.statCard').forEach(card => {
        const value = card.getAttribute('data-value');
        const circle = card.querySelector('.circle');

        if (!circle) return;

        circle.style.background = `conic-gradient(red ${value}%, #111 ${value}%)`;
        circle.innerHTML = value + "%";
    });
}