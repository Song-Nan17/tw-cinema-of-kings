function storageInit(data) {
    const movies = formatGenresToArray(data);
    const moviesString = JSON.stringify(movies);
    localStorage.setItem('movies', moviesString);
}
function getMoviesFromStorage() {
    const movies = localStorage.getItem('movies');
    return JSON.parse(movies);
}
function storageSortName(sortName) {
    localStorage.setItem('sortName', sortName);
}

function storageSortMovies(sortMovies) {
    sortMovies = JSON.stringify(sortMovies);
    localStorage.setItem("sortMovies", sortMovies);
}

function getSortNameInStorage() {
    return localStorage.getItem('sortName');
}

function getSortMoviesInStorage() {
    const sortMovies = localStorage.getItem("sortMovies");
    return JSON.parse(sortMovies);
}