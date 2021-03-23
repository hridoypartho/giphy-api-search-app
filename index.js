import axios from "axios";
import debounce from "debounce";

const searchForm = document.querySelector("#searchForm");
const searchTextInput = document.querySelector("#searchText");
const root = document.querySelector("#root");

const API_KEY = "o3kDK7wDnCgmt56fOs7qd1xMxQkw8pGX";
const COUNT = 10;
let OFFSET = 0;

let searchText = "javascript";

const getData = () => {

    root.innerHTML = '<div class="loader">Loading...</div>';

    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchText}&limit=${COUNT}&offset=${OFFSET}&rating=g&lang=en`;

    axios
        .get(URL)
        .then((response) => {
            root.innerHTML = "";
            response.data.data.forEach((dataItme) => {

                const div = document.createElement("div");
                div.classList.add("item");
                // data[0].images.original.url
                div.style.background = `url(${dataItme.images.original.url}) no-repeat`;

                root.appendChild(div);

            })
        })
        .catch((error) => {
            console.log(error);
        });

};
getData();
const debounceGetData = debounce(getData, 400);

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
})

searchTextInput.addEventListener("keyup", (event) => {
    searchText = event.target.value;
    debounceGetData();
})

// Pagination 

const btnContainer = document.querySelector(".btn-container");
const previousBtn = btnContainer.querySelector(".previous");
const nextBtn = btnContainer.querySelector(".next");

previousBtn.addEventListener("click", () => {
    if (OFFSET > 0) {
        OFFSET = OFFSET - COUNT;
        getData();
    }
});
nextBtn.addEventListener("click", () => {
    OFFSET = OFFSET + COUNT;
    getData();
});