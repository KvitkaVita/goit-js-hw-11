import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31809816-0fc416fbf472d50567331d7d5';

export async function fetchImages(searchQuery, page = 1) {
  const response = await axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    )

    const { data } = response;
    return { data };
}
