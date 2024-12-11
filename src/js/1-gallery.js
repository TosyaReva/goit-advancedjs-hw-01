'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import images from './imageData.json';

const gallery = document.querySelector('.gallery');

function makeMarkup(arrOfImages) {
  const markUp = arrOfImages
    .map(
      image =>
        `<li class="gallery-item">
                    <a class="gallery-link" href="${image.original}">
                        <img
                        class="gallery-image"
                        src="${image.preview}"
                        alt="${image.description}"
                        />
                    </a>
                </li>`
    )
    .join('');

  gallery.innerHTML = markUp;
}

makeMarkup(images);
new SimpleLightbox('.gallery .gallery-item a', {
  captionDelay: 250, //ms
  captionsData: 'alt',
});
