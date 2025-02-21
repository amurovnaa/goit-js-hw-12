import { getImages } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from './img/errorIcon.svg';
import closeIcon from './img/closeIcon.svg';

export const iziOpt = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  close: false,
  buttons: [
    [
      `<button><img src = "${closeIcon}"/></button>`,
      function (instance, toast) {
        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
      },
      true,
    ],
  ],
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

export const refs = {
  form: document.querySelector('.search-form'),
  galleryBox: document.querySelector('.gallery'),
};
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const userKeyword = e.target.elements.imageKey.value.toLowerCase().trim();
  if (!userKeyword) {
    refs.galleryBox.innerHTML = '';
    iziToast.show({
      ...iziOpt,
      message: 'Please fill the search keyword',
    });
  }
  refs.galleryBox.innerHTML =
    '<p class="loader-text">Loading images, please wait... <span class="loader"></span></p>';
  getImages(userKeyword);
  setTimeout(() => {
    e.target.reset();
  }, 10);
});
