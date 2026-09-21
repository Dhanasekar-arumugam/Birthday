
/* =====================================================
   HER PEOPLE - SCRAPBOOK JAVASCRIPT
===================================================== */


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =====================================================
   IMAGE MODAL
===================================================== */

function openImage(imagePath, title) {

    const modalElement =
        document.getElementById("photoModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");


    if (
        !modalElement ||
        !modalImage ||
        !modalTitle
    ) {
        return;
    }


    modalImage.src = imagePath;

    modalImage.alt = title;

    modalTitle.textContent = title;


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );


    modal.show();

}


/* =====================================================
   CLEAR MODAL IMAGE
===================================================== */

const photoModal =
    document.getElementById("photoModal");


if (photoModal) {

    photoModal.addEventListener(
        "hidden.bs.modal",
        () => {

            const modalImage =
                document.getElementById(
                    "modalImage"
                );


            if (modalImage) {

                modalImage.src = "";

            }

        }
    );

}


/* =====================================================
   IMAGE LOAD EFFECT
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".polaroid img, .center-photo img"
    );


galleryImages.forEach((image) => {

    image.addEventListener(
        "load",
        () => {

            image.classList.add("loaded");

        }
    );

});


/* =====================================================
   SMALL PARALLAX EFFECT
   DESKTOP ONLY
===================================================== */

const scrapbookBoard =
    document.querySelector(
        ".scrapbook-board"
    );


if (
    scrapbookBoard &&
    window.innerWidth > 767
) {

    let ticking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    () => {

                        const rect =
                            scrapbookBoard.getBoundingClientRect();


                        const viewport =
                            window.innerHeight;


                        if (
                            rect.top < viewport &&
                            rect.bottom > 0
                        ) {

                            const progress =
                                (
                                    viewport - rect.top
                                ) /
                                (
                                    viewport + rect.height
                                );


                            const center =
                                document.querySelector(
                                    ".center-memory"
                                );


                            if (center) {

                                center.style.marginTop =
                                    `${progress * 8}px`;

                            }

                        }


                        ticking = false;

                    }
                );


                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   PREVENT BROKEN IMAGE FEEL
===================================================== */

galleryImages.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.opacity = "0.35";

        }
    );

});


/* =====================================================
   KEYBOARD ESCAPE
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            const modal =
                bootstrap.Modal.getInstance(
                    photoModal
                );


            if (modal) {

                modal.hide();

            }

        }

    }
);

document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".photo-card");

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const card = entry.target;

      const image = card.querySelector("img");
      const wording = card.querySelector(".photo-info");

      // Show photo
      if (image) {
        image.classList.add("photo-visible");
      }

      // Show wording slightly later
      if (wording) {
        setTimeout(() => {
          wording.classList.add("wording-visible");
        }, 500);
      }

      observer.unobserve(card);
    });

  }, {
    threshold: 0.3
  });

  cards.forEach(card => {
    observer.observe(card);
  });

});
