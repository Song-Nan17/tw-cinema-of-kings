function onloadPageListener() {
    // storageInit(data);

    showMovieSortTable();
    ShowMoviesBySort13("全部");
    showHighScoreMovies();
    isToFixHeader();
    slideShow();
}

function scrollTopListerner() {
    isToFixHeader();
}

function showMoviesBySortListener(event) {
    toShowMoviesBySort(event);
}

function switchMovies(event) {
    showSortMoviesByPage(event);
}

function showMoviesBySearchSortListener(event) {
    showMoviesBySearchSort(event);
}

function showErrorImg(event) {
    replaceImgSrc(event);
}

function showMoreMoviesListener() {
    showMoreMovies();
}

function onloadShowResult() {
    showSearchSortTable();
    getAndShowSearchResult();
}

function onloadShowMovie() {
    showMovieDetails();
}

function toMovieDetailsPage(event) {
    isToMovieDetailsPage(getMovieId(event));
}

function toSearchPage(event) {
    isToMovieSearchPage(getSearchContent(event));
}

function toHomePage() {
    window.location = `index.html`;
}
