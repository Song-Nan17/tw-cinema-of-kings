function getSortArr() {
    const movies = getMoviesFromStorage();
    const movieSorts = movies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), ['全部']);
    return movieSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);
}

function showMovieSortTable() {
    let sortArr = getSortArr();
    let liTags = sortArr.map(sortName => `<li>${sortName}</li>`);
    liTags[0] = `<li class="sort-clicked">${sortArr[0]}</li>`
    document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
    let movies = getMoviesFromStorage();
    let sortMovies = getMoviesBySort('全部', movies);
    storageSortMovies(sortMovies);
    showMoviesBySort(sortMovies, 12);
}


function getSortName(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        changeClickedLiClassName(event);
        storageSortName(event.target.innerHTML);
        return event.target.innerHTML;
    }
    return
}

function getMoviesBySort(sortName, movies) {
    if (sortName !== '全部') {
        movies = movies.filter(movie => movie.genres.includes(sortName));
    }
    return movies;
}

function generatePageButtons(number) {
    let numbers = [];
    numbers.length = Math.ceil(number / 12);
    numbers.fill(0);
    let buttons = numbers.map((number, index, arr) =>
        `<button type="button" id="${index}" class="page-button" onclick="switchMovies(this)">${index + 1}</button>`);
    return buttons.join("\n");
}

function showSortMoviesByPage(event) {
    let sortMovies = getSortMoviesInStorage();
    let movieDivs = getMovieDivs(sortMovies);
    let startNumber = event.id * 12;
    document.getElementById('sortMovies').innerHTML = `${movieDivs.slice(startNumber, startNumber + 12).join('\n')}
      <form class="page">${generatePageButtons(sortMovies.length)}</form>`;
}

function showSearchSortTable() {
    const searchSorts = getSearchSort();
    if (searchSorts.length > 0) {
        const liTags = searchSorts.map(sortName => `<li>${sortName}</li>`);
        document.getElementById('releventSort').innerHTML = `相关分类`;
        document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
    }
}

function toShowMoviesBySort(event) {
    const sortName = getSortName(event);
    const movies = getMoviesFromStorage();
    const sortMovies = getMoviesBySort(sortName, movies);
    storageSortMovies(sortMovies);
    showMoviesBySort(sortMovies, 12);
}

function showMoviesBySearchSort(event) {
    const sortName = getSortName(event);
    const searchMoives = getSearchResult();
    const sortMovies = getMoviesBySort(sortName, searchMoives);
    storageSortMovies(sortMovies);
    showMoviesBySort(sortMovies, 12);
}

function showMoviesBySort(sortMovies, movieNumber) {
    const movieDivs = getMovieDivs(sortMovies);
    document.getElementById('sortMovies').innerHTML = `${movieDivs.slice(0, movieNumber).join('\n')}
      <form class="page">${generatePageButtons(sortMovies.length)}</form>`;
    //   <p id="moreMovies" onclick = "showMoreMoviesListener()">更多>></p>
}

function showMoreMovies() {
    const sortMovies = getSortMoviesInStorage();
    showMoviesBySort(sortMovies);
}

