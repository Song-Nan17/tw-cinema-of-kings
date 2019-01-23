function onloadPageListener() {
    storageInit(data);
    showMovieSortTable();
    showHighScoreMovies();
    slideShow();
}

function scrollTopListerner() {
    let header = document.getElementsByTagName('header')[0];
    let main = document.getElementsByTagName('main')[0];
    if (document.documentElement.scrollTop > 430) {
        header.style.position = "fixed";
        header.style.background = "rgba(243, 237, 237, 0.719)";
    } else {
        header.style.position = "absolute";
        header.style.background = "";
    }
}

function showMoviesBySortListener(event) {
    toShowMoviesBySort(event);
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

if (document.documentElement.scrollTop == 70) {
    alert(70);
}