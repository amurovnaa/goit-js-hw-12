import SimpleLightbox from 'simplelightbox';
import { hideLoadBtn, showLoadBtn } from './pixabay-api.js';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '..//main.js';
let lightbox;
export function markupRender(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class='gallery-item'>
        <a class='gallery-link' href="${largeImageURL}">
        <div class gallery-block>
        <img class='gallery-img' src="${webformatURL}" alt="${tags}" />
          <div class="gallery-details">
            <div class = "descr">
            <p>Likes</p>
            <span>${likes}</span>
            </div>
            <div class = "descr">
            <p>Views</p>
            <span>${views}</span>
            </div>
            <div class = "descr">
            <p>Comments</p>
            <span>${comments}</span>
            </div>
            <div class = "descr">
            <p>Downloads</p>
            <span>${downloads}</span>
            </div>
          </div>
          </div>
        </a>
      </li>`
    )
    .join(' ');
  return markup;
}
export function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
      showCounter: false,
    });
  } else {
    lightbox.refresh();
  }
}
export function addLoaderMore(loaderBox) {
  hideLoadBtn();
  loaderBox.insertAdjacentHTML(
    'beforeend',
    '<p class="loader-text">Loading images, please wait... <span class="loader"></span></p>'
  );
}
export function removeLoaderMore(loaderBox) {
  const textLoader = loaderBox.querySelector('.loader-text');
  const loader = loaderBox.querySelector('.loader');
  if (textLoader) textLoader.remove();
  if (loader) loader.remove();
  showLoadBtn();
}
