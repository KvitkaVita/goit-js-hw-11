
import Notiflix from 'notiflix';
import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `31809816-0fc416fbf472d50567331d7d5`;

const fetchImages = async (input, page) => {
    const response = await axios.get
}