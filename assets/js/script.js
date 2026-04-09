function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-stuff').innerHTML = data;

            const hamburgerBtn = document.getElementById('hamburger-btn');
            const navMenu = document.getElementById('navmenu');

            if (hamburgerBtn && navMenu) {
                hamburgerBtn.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
}

document.addEventListener("DOMContentLoaded", loadHeader);

function setupLightbox() {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const modalVideo = document.getElementById("lightbox-video");
    const closeBtn = document.querySelector(".lightbox-close");

    if (!modal) return;

    const mediaItems = document.querySelectorAll('.article-image-float, .article-image-center, .gallery-image, .row-item, .infobox-image');

    mediaItems.forEach(media => {
        media.addEventListener('click', function() {
            modal.style.display = "block";

            if (this.tagName === 'IMG') {
                modalImg.style.display = "block";
                modalVideo.style.display = "none";
                modalImg.src = this.src;
            }
            else if (this.tagName === 'VIDEO') {
                modalVideo.style.display = "block";
                modalImg.style.display = "none";
                modalVideo.src = this.src;

                if (this.hasAttribute('autoplay')) {
                    modalVideo.setAttribute('autoplay', '');
                    modalVideo.play();
                } else {
                    modalVideo.removeAttribute('autoplay');
                }

                if (this.hasAttribute('loop')) modalVideo.setAttribute('loop', '');
                else modalVideo.removeAttribute('loop');

                if (this.hasAttribute('muted')) {
                    modalVideo.setAttribute('muted', '');
                    modalVideo.muted = true;
                } else {
                    modalVideo.removeAttribute('muted');
                    modalVideo.muted = false;
                }

                if (this.hasAttribute('controls')) modalVideo.setAttribute('controls', '');
                else modalVideo.removeAttribute('controls');
            }
        });
    });

    function closeLightbox() {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = "";
    }

    closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeLightbox();
        }
    });
}

document.addEventListener("DOMContentLoaded", setupLightbox);

window.addEventListener("load", function() {
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);

        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }
});
