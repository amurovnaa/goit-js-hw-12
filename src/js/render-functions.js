import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from '..//main.js';

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

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    showCounter: false,
  });
  lightbox.refresh();
  return markup;
}
