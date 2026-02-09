const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('main-card');
const successContainer = document.getElementById('success-container');

const neutralBg = document.getElementById('neutral-bg');
const loveBg = document.getElementById('love-bg');

let scaleLevel = 1;
const phrases = ["Tu es sûre ?", "Vraiment ?", "Pense-y...", "Essaie le rose !", "Allez...", "Non mais oh !"];

// --- 1. Gestion du NON ---
const moveButton = () => {
    scaleLevel += 0.3;
    yesBtn.style.transform = `scale(${scaleLevel})`;
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Déplacement uniquement sur PC
    const isTouch = 'ontouchstart' in document.documentElement;
    if (!isTouch) {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
        noBtn.style.position = "fixed";
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// --- 2. Action du OUI ---
yesBtn.addEventListener('click', () => {
    console.log("Elle a dit OUI !");

    // A. Changement visuel
    document.body.classList.add('love-mode'); // Fond rose
    neutralBg.style.display = 'none';         // Cache les nuages/étoiles
    loveBg.style.display = 'block';           // Affiche les cœurs

    // B. CORRECTION : Disparition brutale de la carte
    mainCard.classList.add('force-hide');
    
    // C. Apparition du succès
    successContainer.classList.add('visible');

    // D. Explosion de confettis
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 6,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff4d6d', '#ffffff'],
            shapes: ['heart']
        });
        confetti({
            particleCount: 6,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff4d6d', '#ffffff'],
            shapes: ['heart']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // E. Envoi Email (Remplace TON_ID_ICI)
    fetch("https://formspree.io/f/TON_ID_ICI", {
        method: "POST",
        body: JSON.stringify({
            message: "Elle a dit OUI ! ❤️",
            date: new Date().toLocaleString()
        }),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }).catch(err => console.error(err));
});