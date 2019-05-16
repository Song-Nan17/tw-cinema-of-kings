function onloadPageListener() {
    showMovieSortTable();
    ShowMoviesBySort("全部",0);
    showMoviesInTheater();
    fixHeader();
    slideShow();
}

function scrollTopListener() {
    fixHeader();
}

function showMoviesBySortListener(event) {
    toShowMoviesBySort(event);
}

function showErrorImg(event) {
    replaceImgSrc(event);
}

function onloadShowResult() {
    let search =getSearchContentFromUrl();
    document.getElementById('search-box').value=search;
    getAndShowSearchResult(search,0);
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

function lastPageListener() {
    lastPage();
}

function nextPageListener() {
    nextPage();
}