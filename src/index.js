import Notiflix from 'notiflix';
import { fetchImages } from './fetchImages.js';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let page = 1;
let searchQuery = '';

function onSearch(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.query.value.trim();

  resetPage();

  if (!searchQuery) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  fetchImages(searchQuery, page).then(({ data }) => {
    if (!data.totalHits) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    refs.gallery.innerHTML = '';

    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    totalPages = Math.ceil(data.totalHits / imagesPerPage);
    if (page === totalPages) {
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
}

function onLoadMore() {
  page += 1;

  fetchImages(page).then(data => {
    gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    if ((data.page = data.pages)) {
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}

function resetPage() {
  page = 1;
}
