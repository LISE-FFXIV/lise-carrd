// =========================
// CONFIG
// =========================
const images = [
  "assets/gallery/img01.png",
  "assets/gallery/img02.png",
  "assets/gallery/img03.png",
  "assets/gallery/img04.png",
  "assets/gallery/img05.png",
  "assets/gallery/img06.png",
  "assets/gallery/img07.png",
  "assets/gallery/img08.png",
  "assets/gallery/img09.png",
  "assets/gallery/img10.png",
  "assets/gallery/img11.png",
  "assets/gallery/img12.png",
  "assets/gallery/img13.png",
  "assets/gallery/img14.png",
  "assets/gallery/img15.png",
  "assets/gallery/img16.png",
  "assets/gallery/img17.png",
  "assets/gallery/img18.png",
  "assets/gallery/img19.png",
  "assets/gallery/img20.png",
  "assets/gallery/img21.png",
  "assets/gallery/img22.png",
  "assets/gallery/img23.png",
  "assets/gallery/img24.png",
  "assets/gallery/img25.png",
  "assets/gallery/img26.png",
  "assets/gallery/img27.png",
  "assets/gallery/img28.png",
  "assets/gallery/img29.png",
  "assets/gallery/img30.png",
  "assets/gallery/img31.png",
  "assets/gallery/img32.png",
  "assets/gallery/img33.png",
  "assets/gallery/img34.png",
  "assets/gallery/img35.png",
];

// =========================
// DOM ELEMENTS
// =========================
const gallery = document.querySelector(".gallery__section");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox__img");
const closeBtn = document.querySelector(".lightbox__close");

const prevBtn = document.querySelector(".lightbox__arrow--left");
const nextBtn = document.querySelector(".lightbox__arrow--right");

// =========================
// STATE
// =========================
let currentIndex = 0;
let scale = 1;

// =========================
// GALLERY RENDER + LAZY LOAD
// =========================
images.forEach((src, index) => {
  const img = document.createElement("img");

  img.dataset.src = src;
  img.dataset.index = index;

  // Lazy loading via IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      el.src = el.dataset.src;

      el.onload = () => el.classList.add("loaded");

      observer.unobserve(el);
    });
  });

  observer.observe(img);

  // Open lightbox on click
  img.addEventListener("click", () => openLightbox(index));

  gallery.appendChild(img);
});

// =========================
// LIGHTBOX OPEN / CLOSE
// =========================
function openLightbox(index) {
  currentIndex = index;

  lightbox.classList.add("active");

  setImage();
  updateArrows();
}

function closeLightbox() {
  lightbox.classList.remove("active");

  lightboxImg.src = "";

  scale = 1;
  lightboxImg.style.transform = "scale(1)";
}

// =========================
// IMAGE HANDLING
// =========================
function setImage() {
  const src = images[currentIndex];
  lightboxImg.src = src;

  preload(currentIndex + 1);
}

// Preload next image for smooth UX
function preload(index) {
  const img = new Image();
  img.src = images[index % images.length];
}

// =========================
// NAVIGATION (ARROWS + SWIPE + KEYBOARD)
// =========================
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  setImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  setImage();
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

// =========================
// TOUCH SWIPE (mobile)
// =========================
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? nextImage() : prevImage();
  }
});

// =========================
// PINCH ZOOM (mobile)
// =========================
let initialDistance = null;

lightboxImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches);
  }
});

lightboxImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches);

    scale = newDistance / initialDistance;
    scale = Math.max(1, Math.min(scale, 3));

    lightboxImg.style.transform = `scale(${scale})`;
  }
});

lightboxImg.addEventListener("touchend", () => {
  initialDistance = null;
});

function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;

  return Math.sqrt(dx * dx + dy * dy);
}

// =========================
// ARROWS UI
// =========================
function updateArrows() {
  const show = images.length > 1;

  prevBtn.style.display = show ? "flex" : "none";
  nextBtn.style.display = show ? "flex" : "none";
}

// =========================
// EVENTS (ARROWS + CLOSE)
// =========================
prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
