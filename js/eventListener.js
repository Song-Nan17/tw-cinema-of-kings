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

    const url = 'https://api.douban.com/v2/movie/subject/26865690/photos?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=100&client=&udid='
    request('get', url, (data) => {
        console.log(data)
    })
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