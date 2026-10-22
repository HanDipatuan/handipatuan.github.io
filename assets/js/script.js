'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

/* Project Lightbox Gallery */
(function () {
  const lightbox = document.getElementById("project-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxWebsite = document.getElementById("lightbox-website");
  const closeButton = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  const prevButton = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  const nextButton = lightbox ? lightbox.querySelector(".lightbox-next") : null;
  const zoomInButton = document.getElementById("lightbox-zoom-in");
  const zoomOutButton = document.getElementById("lightbox-zoom-out");

  if (!lightbox || !lightboxImage || !lightboxTitle ||
      !lightboxWebsite || !closeButton || !prevButton || !nextButton ||
      !zoomInButton || !zoomOutButton) {
    return;
  }

  const triggers = Array.from(document.querySelectorAll(".project-lightbox-trigger"));
  let currentIndex = 0;
  let zoomLevel = 1;
  const ZOOM_STEP = 0.25;
  const ZOOM_MAX = 3;

  function applyZoom() {
    if (zoomLevel === 1) {
      lightboxImage.style.width = "";
      lightboxImage.style.maxHeight = "";
      lightboxImage.style.maxWidth = "";
    } else {
      lightboxImage.style.width = (100 * zoomLevel) + "%";
      lightboxImage.style.maxHeight = "none";
      lightboxImage.style.maxWidth = "none";
    }
    zoomOutButton.disabled = zoomLevel <= 1;
    zoomInButton.disabled = zoomLevel >= ZOOM_MAX;
  }

  function resetZoom() {
    zoomLevel = 1;
    applyZoom();
  }

  function showItem(index) {
    const item = triggers[index];
    const img = item.querySelector("img");
    const titleEl = item.querySelector(".project-title");
    const website = item.getAttribute("href");

    lightboxImage.src = img ? img.src : "";
    lightboxImage.alt = img ? img.alt : "Project preview";
    lightboxTitle.textContent = titleEl ? titleEl.textContent : "";
    lightboxWebsite.href = website || "#";
    lightboxWebsite.style.display = (website && website !== "#") ? "" : "none";
    resetZoom();
  }

  triggers.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      currentIndex = index;
      showItem(currentIndex);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      closeButton.focus();
    });
  });

  zoomInButton.addEventListener("click", () => {
    if (zoomLevel < ZOOM_MAX) { zoomLevel = Math.min(zoomLevel + ZOOM_STEP, ZOOM_MAX); applyZoom(); }
  });

  zoomOutButton.addEventListener("click", () => {
    if (zoomLevel > 1) { zoomLevel = Math.max(zoomLevel - ZOOM_STEP, 1); applyZoom(); }
  });

  // Drag to pan
  const imageWrapper = lightbox.querySelector(".lightbox-image-wrapper");
  let isDragging = false;
  let dragStartX, dragStartY, scrollStartX, scrollStartY;

  lightboxImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    scrollStartX = imageWrapper.scrollLeft;
    scrollStartY = imageWrapper.scrollTop;
    lightboxImage.classList.add("is-dragging");
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    imageWrapper.scrollLeft = scrollStartX - (e.clientX - dragStartX);
    imageWrapper.scrollTop = scrollStartY - (e.clientY - dragStartY);
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      lightboxImage.classList.remove("is-dragging");
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
    showItem(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % triggers.length;
    showItem(currentIndex);
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + triggers.length) % triggers.length; showItem(currentIndex); }
    if (event.key === "ArrowRight") { currentIndex = (currentIndex + 1) % triggers.length; showItem(currentIndex); }
  });
}());