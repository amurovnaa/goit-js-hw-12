import {
  getImages,
  hideLoadBtn,
  checkBtnStatus,
  showLoadBtn,
} from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from './img/errorIcon.svg';
import closeIcon from './img/closeIcon.svg';
import {
  markupRender,
  addLoaderMore,
  removeLoaderMore,
} from './js/render-functions';

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
  loadBtn: document.querySelector('.load-btn'),
  loaderMore: document.querySelector('.loader-more'),
};

export const params = {
  userKeyword: null,
  page: null,
  total: null,
  perPage: 40,
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  params.page = 1;
  params.userKeyword = e.target.elements.imageKey.value.toLowerCase().trim();
  if (!params.userKeyword) {
    refs.galleryBox.innerHTML = '';
    iziToast.show({
      ...iziOpt,
      message: 'Please fill the search keyword',
    });
  }
  refs.galleryBox.innerHTML =
    '<p class="loader-text">Loading images, please wait... <span class="loader"></span></p>';
  hideLoadBtn();
  try {
    const result = await getImages(
      params.userKeyword,
      params.page,
      params.perPage
    );
    params.total = result.totalHits;
    const markup = markupRender(result.hits);
    refs.galleryBox.innerHTML = markup;
    const resetInput = await setTimeout(() => {
      e.target.reset();
    }, 10);
  } catch (error) {
    iziToast.show({
      ...iziOpt,
      message: `Sorry, ${error}!`,
    });
    refs.galleryBox.innerHTML = '';
    hideLoadBtn();
    console.log(error);
  }
  checkBtnStatus();
});

refs.loadBtn.addEventListener('click', async () => {
  params.page += 1;
  checkBtnStatus();
  addLoaderMore(refs.loaderMore);
  try {
    const result = await getImages(
      params.userKeyword,
      params.page,
      params.perPage
    );
    const markup = markupRender(result.hits);
    removeLoaderMore(refs.loaderMore);
    scrollPage();
    refs.galleryBox.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    iziToast.show({
      ...iziOpt,
      message: `Sorry, ${error}!`,
    });
    refs.galleryBox.innerHTML = '';
    hideLoadBtn();
    console.log(error);
  }
});

function scrollPage() {
  const info = refs.galleryBox.firstElementChild.getBoundingClientRect();
  const height = info.height;
  scrollBy({
    behavior: 'smooth',
    top: height * 3 + 50,
  });
}
