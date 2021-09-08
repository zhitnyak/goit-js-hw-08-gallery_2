import galleryItems from "./gallery_items.js";

const galleryEl = document.querySelector(".js-gallery");
const imgCardModal = document.querySelector(".lightbox__image");
const boxModal = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlayModal = document.querySelector(".lightbox__overlay");

galleryEl.addEventListener("click", onOpenModal);
closeModalBtn.addEventListener("click", onCloseModal);
overlayModal.addEventListener("click", onCloseModalOverlayClick);

const galleryMarkup = createGalleryElMarkup(galleryItems);

galleryEl.insertAdjacentHTML("afterbegin", galleryMarkup);

function createGalleryElMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a
      class="gallery__link"
      href="${original}"
      >
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
      </a>
      </li> `;
    })
    .join("");
}
// console.dir(createGalleryElMarkup);

function onOpenModal(e) {
  const imgCard = e.target;

  e.preventDefault();
  if (imgCard.nodeName !== "IMG") return;

  imgCardModal.attributes.src.value = imgCard.dataset.source;
  boxModal.classList.add("is-open");

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onChangeNextImg);
  window.addEventListener("keydown", onPressArrowRight);
  window.addEventListener("keydown", onPressArrowLeft);
}

function onCloseModal() {
  boxModal.classList.remove("is-open");
  imgCardModal.src = "";
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onChangeNextImg);
  window.removeEventListener("keydown", onPressArrowRight);
  window.removeEventListener("keydown", onPressArrowLeft);
}

function onCloseModalOverlayClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
}

const renderingGalleryEl = document.querySelectorAll(".gallery__image");

function onPressArrowRight(e) {
  e.code === "ArrowRight";
}

function onPressArrowLeft(e) {
  e.code === "ArrowLeft";
}

function onChangeNextImg(e) {
  const imgArray = [...renderingGalleryEl].map(({ original }) => {});

  const currentValueSrc = imgCardModal.getAttribute("src");
  let idx = imgArray.indexOf(currentValueSrc);

  // console.log(e.code);
  if (e.code === "ArrowRight") {
    idx === imgCardModal.length - 1;
    return imgCardModal[idx - 1];
  }
  if (e.code === "ArrowLeft") {
    idx === imgCardModal.length + 1;
    return imgCardModal[idx + 1];
  }
  // onOpenModal();
}

addLoadingLazy();

function addLoadingLazy() {
  if ("loading" in HTMLImageElement.prototype) {
    renderingGalleryEl.forEach((item) => (item.loading = "lazy"));
  } else {
    const scriptLazy = document.createElement("script");
    scriptLazy.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    scriptLazy.integrity =
      "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    scriptLazy.crossorigin = "anonymous";
    scriptLazy.referrerpolicy = "no-referrer";
    document.body.appendChild(scriptLazy);
  }
}
