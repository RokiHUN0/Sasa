const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");

const questionScreen = document.getElementById("questionScreen");
const successScreen = document.getElementById("successScreen");

const buttonsArea = document.getElementById("buttons");

let escapeCount = 0;


/*
    Véletlenszerű új pozíció keresése
*/
function moveNoButton() {

    escapeCount++;

    const areaRect = buttonsArea.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();

    const padding = 10;

    const maxX =
        areaRect.width -
        buttonRect.width -
        padding;

    const maxY =
        areaRect.height -
        buttonRect.height -
        padding;

    const randomX =
        padding +
        Math.random() * Math.max(0, maxX);

    const randomY =
        padding +
        Math.random() * Math.max(0, maxY);

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;


    /*
        Minden menekülés után egy kicsit nő az IGEN.
    */

    const scale =
        Math.min(1 + escapeCount * 0.035, 1.35);

    yesButton.style.transform =
        `scale(${scale})`;


    /*
        Egy idő után változik a NEM szövege.
    */

    if (escapeCount === 3) {
        noButton.textContent = "Biztos? 😏";
    }

    if (escapeCount === 6) {
        noButton.textContent = "Ne már 😭";
    }

    if (escapeCount === 9) {
        noButton.textContent = "NEM? 🥺";
    }

    if (escapeCount === 12) {
        noButton.textContent = "NEM 😭";
    }
}


/*
    iPhone / érintőképernyő
*/
noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();
    },
    {
        passive: false
    }
);


/*
    Ha esetleg gépen nyitják meg,
    egérrel is működjön.
*/
noButton.addEventListener(
    "mouseenter",
    function() {

        moveNoButton();
    }
);


/*
    Biztonsági megoldás:
    ha valahogy mégis sikerül megnyomni.
*/
noButton.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        moveNoButton();
    }
);


/*
    IGEN gomb
*/
yesButton.addEventListener(
    "click",
    function() {

        questionScreen.classList.add("hidden");

        successScreen.classList.remove("hidden");

        createConfetti();
    }
);


/*
    Egyszerű konfetti
*/
function createConfetti() {

    const emojis = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "✨",
        "🥰"
    ];

    for (let i = 0; i < 35; i++) {

        const piece = document.createElement("div");

        piece.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        piece.style.position = "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-30px";

        piece.style.fontSize =
            (20 + Math.random() * 20) + "px";

        piece.style.zIndex = "999";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);


        const duration =
            2000 + Math.random() * 2500;

        const rotation =
            Math.random() * 720 - 360;

        piece.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${rotation}deg)`,
                    opacity: 0.8
                }
            ],
            {
                duration: duration,
                easing: "cubic-bezier(.2,.8,.3,1)"
            }
        );


        setTimeout(
            () => piece.remove(),
            duration
        );
    }
}