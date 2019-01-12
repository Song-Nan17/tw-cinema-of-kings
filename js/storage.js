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

function getSortNameInStorage() {
    return localStorage.getItem('sortName');
}