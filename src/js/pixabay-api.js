import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs, iziOpt } from '..//main.js';

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
