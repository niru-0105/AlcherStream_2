const API_KEY = 'api_key=30ed42564c56a79f475e2260542cea69';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const search_URL = BASE_URL + '/search/movie?' + API_KEY;
const main = document.getElementById('movies');

const form = document.getElementById('searchbar');
const search = document.getElementById('Sbox');
const heading = document.getElementById('movies-here').innerHTML;
getmovies(API_URL);

function getmovies(url) {
    fetch(url).then(response => {
        console.log('resolved');
        return response.json();
    }).then(data => {
        console.log(data.results);
        showmovies(data.results);
    }).catch(err => {
        console.log('rejected', err);
    })
}


//movies-display-on-main-site
function showmovies(data) {

    main.innerHTML = '';
    data.forEach(movie => {
        const {  poster_path } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-div');
        movieEl.innerHTML = `<img class="movie-pic" src="${IMG_URL + poster_path}" >`
        main.appendChild(movieEl);
    })
}

//rating box color change according to vote
// function getcolor(vote) {
//     if (vote >= 8) {
//         return "green"
//     }
//     else if (vote >= 5) {
//         return "orange"
//     }
//     else {
//         return "red"
//     }
// }

//serch movie-display
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchterm = search.value;
    if (searchterm) {
        document.getElementById('movies-here').innerHTML = `<h2> <span> Search Results For: </span>${searchterm}</h2>`
        getmovies(search_URL + '&query=' + searchterm)
   }
})