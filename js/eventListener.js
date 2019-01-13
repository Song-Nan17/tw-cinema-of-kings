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

function toShowMoviesBySort(event) {
    showMoviesBySort(getSortName(event),10);
}

function showMoreMovies() {
    showMoviesBySort(getSortNameInStorage());
}

function onloadShowResult() {
    storageInit(data);
    showMovieSortTable();
    showSearchResult();
}


function onloadShowMovie() {
    storageInit(data);
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