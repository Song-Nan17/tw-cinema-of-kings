function request(type, url, callback) {
    $.ajax({
        type,
        url,
        dataType: "jsonp",
        success: function (json) {
            callback(json)
        }
    });
}

function onloadPageListener() {
    storageInit(data);
    showMovieSortTable();
    showHighScoreMovies();
    slideShow()
}

function showMoviesBySortListener(event) {
    toShowMoviesBySort(event);
}

function showMoviesBySearchSortListener(event) {
    showMoviesBySearchSort(event);
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