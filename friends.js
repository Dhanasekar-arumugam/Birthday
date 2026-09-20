
/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        // Once revealed, stop observing it
        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  }
);


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================
   IMAGE MODAL
   ========================= */

function openImage(imagePath, title) {

  const modalImage =
    document.getElementById("modalImage");

  const modalTitle =
    document.getElementById("modalTitle");


  modalImage.src = imagePath;

  modalTitle.textContent = title;


  const modalElement =
    document.getElementById("photoModal");


  const modal =
    new bootstrap.Modal(modalElement);


  modal.show();
}


/* =========================
   VIDEO AUTO PLAY WHEN VISIBLE
   ========================= */

const videos =
  document.querySelectorAll(".memory-video");


const videoObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        const video = entry.target;


        if (entry.isIntersecting) {

          /*
             Video will NOT automatically play
             with sound because browsers block
             that behavior.

             We only load it when it comes near
             the screen.
          */

          video.setAttribute("preload", "metadata");

        }

        else {

          // Pause when user scrolls away
          if (!video.paused) {
            video.pause();
          }

        }

      });

    },
    {
      threshold: 0.35
    }
  );


videos.forEach((video) => {
  videoObserver.observe(video);
});


/* =========================
   CLOSE VIDEO WHEN MODAL
   ========================= */

const photoModal =
  document.getElementById("photoModal");


photoModal.addEventListener(
  "hidden.bs.modal",
  function () {

    const modalImage =
      document.getElementById("modalImage");

    modalImage.src = "";

  }
);
