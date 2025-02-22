import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs, iziOpt, params } from '..//main.js';
import infoIcon from '../img/infoIcon.svg';
import closeIcon from '../img/closeIcon.svg';

export async function getImages(userImgKeyword, page, perPage) {
  const apiUrl = 'https://pixabay.com/api/';
  const params = {
    params: {
      key: '48850297-faa43785257f145b82efcd967',
      q: encodeURIComponent(userImgKeyword),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  };
  try {
    const data = await axios.get(apiUrl, params).then(res => {
      if (!res.data.hits.length) {
        refs.galleryBox.innerHTML = '';
        iziToast.show({
          ...iziOpt,
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
        });
      }
      return res.data;
    });
    return data;
  } catch (error) {
    iziToast.show({
      ...iziOpt,
      message: 'Sorry, request error!',
    });
    refs.galleryBox.innerHTML = '';
    console.log(error);
  }
}

export function showLoadBtn() {
  refs.loadBtn.classList.remove('hidden');
}

export function hideLoadBtn() {
  refs.loadBtn.classList.add('hidden');
}

export function checkBtnStatus() {
  const maxPage = Math.ceil(params.total / params.perPage);
  if (params.page >= maxPage) {
    iziToast.show({
      messageColor: '#FFFFFF',
      messageSize: '16px',
      backgroundColor: '#0099FF',
      iconUrl: infoIcon,
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
      message: `We're sorry, but you've reached the end of search results.`,
    });
    return hideLoadBtn();
  } else {
    showLoadBtn();
  }
}
