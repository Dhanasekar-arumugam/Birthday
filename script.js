// ============================================================
// BIRTHDAY PHOTO GALLERY
// Customize the name and text below.
// ============================================================

const CONFIG = {
  birthdayName: "Beautiful Soul",
  letterName: "Beautiful Soul"
};

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const name = document.getElementById("birthdayName");
  const letterName = document.getElementById("letterName");
  const year = document.getElementById("year");

  name.textContent = CONFIG.birthdayName;
  letterName.textContent = CONFIG.letterName;
  year.textContent = new Date().getFullYear();

  window.setTimeout(() => loader.classList.add("hidden"), 900);

  initGallery();
  initFilters();
  initSurprise();
  initMusic();
  startFloatingHearts();
});

// -------------------- Gallery / Lightbox --------------------

let visibleCards = [];
let currentIndex = 0;

function initGallery() {
  const cards = [...document.querySelectorAll(".photo-card")];
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  const refreshCards = () => {
    visibleCards = cards.filter(card => !card.classList.contains("hidden"));
  };

  const openLightbox = (index) => {
    refreshCards();
    currentIndex = index;
    const card = visibleCards[currentIndex];
    if (!card) return;

    const img = card.querySelector("img");
    const title = card.querySelector("h3");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = title ? title.textContent : "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      refreshCards();
      openLightbox(visibleCards.indexOf(card));
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  const showPhoto = (direction) => {
    refreshCards();
    if (!visibleCards.length) return;
    currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
    const card = visibleCards[currentIndex];
    const img = card.querySelector("img");
    const title = card.querySelector("h3");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    caption.textContent = title ? title.textContent : "";
  };

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => showPhoto(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => showPhoto(1));

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(-1);
    if (e.key === "ArrowRight") showPhoto(1);
  });
}

// -------------------- Filters --------------------

function initFilters() {
  const buttons = [...document.querySelectorAll(".filter")];
  const cards = [...document.querySelectorAll(".photo-card")];

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      cards.forEach(card => {
        const categories = card.dataset.category.split(" ");
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });
}

// -------------------- Surprise --------------------

function initSurprise() {
  const modal = document.getElementById("surpriseModal");
  const openBtn = document.getElementById("surpriseBtn");
  const closeBtn = document.getElementById("modalClose");
  const celebrateBtn = document.getElementById("celebrateBtn");

  const open = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  openBtn.addEventListener("click", () => {
    open();
    launchConfetti(90);
  });

  closeBtn.addEventListener("click", close);

  celebrateBtn.addEventListener("click", () => {
    launchConfetti(180);
    createHeartBurst();
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) close();
  });
}

function launchConfetti(amount) {
  const symbols = ["♥", "✦", "✧", "●", "◆"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "confetti";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = 8 + Math.random() * 12 + "px";
    item.style.animationDelay = Math.random() * .8 + "s";
    item.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(item);

    setTimeout(() => item.remove(), 4000);
  }
}

function createHeartBurst() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.zIndex = "3001";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.color = "#ff8fab";
    heart.style.fontSize = 15 + Math.random() * 25 + "px";
    heart.style.pointerEvents = "none";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 300;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.animate([
      { transform: "translate(-50%, -50%) scale(.2)", opacity: 1 },
      { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`, opacity: 0 }
    ], {
      duration: 1300 + Math.random() * 700,
      easing: "cubic-bezier(.1,.7,.2,1)"
    });

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2200);
  }
}

// -------------------- Music --------------------
// Browsers block autoplay. Music starts when the user presses the music button.
// Add your own MP3 in index.html inside the audio element.

function initMusic() {
  const music = document.getElementById("birthdayMusic");
  const button = document.getElementById("musicBtn");

  button.addEventListener("click", async () => {
    if (!music.querySelector("source")) {
      alert("Add your birthday MP3 inside the <audio> element in index.html.");
      return;
    }

    if (music.paused) {
      try {
        await music.play();
        button.classList.add("playing");
        button.innerHTML = "♫ <span>Playing</span>";
      } catch (error) {
        console.log(error);
      }
    } else {
      music.pause();
      button.classList.remove("playing");
      button.innerHTML = "♫ <span>Music</span>";
    }
  });
}

// -------------------- Floating hearts --------------------

function startFloatingHearts() {
  const container = document.querySelector(".floating-hearts");

  setInterval(() => {
    const heart = document.createElement("span");
    heart.textContent = Math.random() > .3 ? "♥" : "✦";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = 10 + Math.random() * 16 + "px";
    heart.style.animationDuration = 4 + Math.random() * 5 + "s";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 9500);
  }, 1200);
}
/* =====================================================
   CELEBRATE EVERYTHING ❤️
===================================================== */

const celebrateBtn = document.getElementById("celebrateBtn");
const birthdayMusic = document.getElementById("birthdayMusic");
const surpriseModal = document.getElementById("surpriseModal");

if (celebrateBtn) {

    celebrateBtn.addEventListener("click", function () {

        /* ==============================================
           1. START MUSIC 🎵
        ============================================== */

        if (birthdayMusic) {

            birthdayMusic.currentTime = 0;

            birthdayMusic.play()
                .then(() => {
                    console.log("Birthday music started ❤️");
                })
                .catch(error => {
                    console.log("Music error:", error);
                });
        }


        /* ==============================================
           2. CLOSE SURPRISE MODAL
        ============================================== */

        if (surpriseModal) {

            surpriseModal.classList.remove("active");

            surpriseModal.setAttribute(
                "aria-hidden",
                "true"
            );
        }


        /* ==============================================
           3. SCREEN GLOW
        ============================================== */

        createLoveCelebration();


        /* ==============================================
           4. I LOVE YOU MESSAGE
        ============================================== */

        createLoveMessage();


        /* ==============================================
           5. FLOATING HEARTS
        ============================================== */

        createFloatingHearts();


        /* ==============================================
           6. FIREWORKS
        ============================================== */

        createFireworks();


        /* ==============================================
           7. EXTRA FIREWORK BURSTS
        ============================================== */

        setTimeout(() => {
            createFireworks();
        }, 900);

        setTimeout(() => {
            createFireworks();
        }, 1800);

    });
}


/* =====================================================
   SCREEN GLOW
===================================================== */

function createLoveCelebration() {

    const celebration =
        document.createElement("div");

    celebration.className =
        "love-celebration";

    document.body.appendChild(celebration);

    setTimeout(() => {

        celebration.remove();

    }, 4500);
}


/* =====================================================
   I LOVE YOU MESSAGE
===================================================== */

function createLoveMessage() {

    const message =
        document.createElement("div");

    message.className =
        "love-message";

    message.innerHTML = "Happy Birthday Nesi..! ❤️";

    document.body.appendChild(message);


    const subtitle =
        document.createElement("div");

    subtitle.className =
        "love-subtitle";

    subtitle.textContent =
        "Forever & Always ✨";

    document.body.appendChild(subtitle);


    /* Keep message for 5 seconds */

    setTimeout(() => {

        message.style.transition =
            "opacity 1s ease, transform 1s ease";

        message.style.opacity = "0";

        message.style.transform =
            "translate(-50%, -50%) scale(1.3)";

        subtitle.style.transition =
            "opacity 1s ease";

        subtitle.style.opacity = "0";

    }, 4000);


    setTimeout(() => {

        message.remove();
        subtitle.remove();

    }, 5500);
}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createFloatingHearts() {

    const hearts = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💓",
        "💘",
        "💝",
        "💞",
        "✨",
        "🌹"
    ];


    for (let i = 0; i < 45; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "celebration-heart";

            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.fontSize =
                18 +
                Math.random() * 32 +
                "px";


            heart.style.animationDuration =
                4 +
                Math.random() * 3 +
                "s";


            document.body.appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 7500);

        }, i * 80);
    }
}


/* =====================================================
   FIREWORKS
===================================================== */

function createFireworks() {

    const centerX =
        15 + Math.random() * 70;

    const centerY =
        15 + Math.random() * 45;


    /* White flash */

    const flash =
        document.createElement("div");

    flash.className =
        "firework-flash";

    flash.style.left =
        centerX + "vw";

    flash.style.top =
        centerY + "vh";

    document.body.appendChild(flash);


    setTimeout(() => {
        flash.remove();
    }, 600);


    /* Firework particles */

    const particleCount = 55;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "firework";


        const angle =
            (Math.PI * 2 * i) /
            particleCount;


        const distance =
            80 +
            Math.random() * 180;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.style.left =
            centerX + "vw";

        particle.style.top =
            centerY + "vh";


        particle.style.setProperty(
            "--x",
            x + "px"
        );


        particle.style.setProperty(
            "--y",
            y + "px"
        );


        const colors = [
            "#ff4f9a",
            "#ff8fc7",
            "#ffd166",
            "#ffffff",
            "#ff6b6b",
            "#c77dff",
            "#7bdff2"
        ];


        particle.style.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        document.body.appendChild(
            particle
        );


        setTimeout(() => {

            particle.remove();

        }, 1600);
    }
}


  /* =====================================================
     TINY CUTE EMOJI PARTICLES
  ====================================================== */

  const cuteParticles = document.getElementById("cuteParticles");

  const cuteEmojis = [
    "♥",
    "♡",
    "💗",
    "💕",
    "💖",
    "✨",
    "⭐",
    "🌸",
    "🦋",
    "🎀",
    "💫",
    "🌷",
    "🥰",
    "💋"
  ];

  function createCuteParticle() {
    const particle = document.createElement("span");

    particle.className = "cute-particle";

    particle.textContent =
      cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];

    particle.style.left = Math.random() * 100 + "%";

    particle.style.fontSize =
      10 + Math.random() * 14 + "px";

    particle.style.animationDuration =
      7 + Math.random() * 8 + "s";

    particle.style.animationDelay =
      Math.random() * 3 + "s";

    cuteParticles.appendChild(particle);


  /* Create particles slowly so the screen doesn't become crowded */

  setInterval(createCuteParticle, 700);

  /* Initial particles */

  for (let i = 0; i < 12; i++) {
    setTimeout(createCuteParticle, i * 300);
  }
  }
 
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu after clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
