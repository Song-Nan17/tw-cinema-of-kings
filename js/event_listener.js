function onloadPageListener() {
    // storageInit(data);

    showMovieSortTable();
    ShowMoviesBySort13("全部",0);
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
    // showSearchSortTable();
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

function toHomePage() {
    window.location = `index.html`;
}

function lastPage() {
    
    let page = document.getElementById("now_page").innerText;
    let pageNum = parseInt(page)-1;
    if(pageNum>0) {
        let genre = document.getElementsByClassName("sort-clicked")[0].innerHTML;
        document.getElementById("now_page").innerText=pageNum;
        ShowMoviesBySort13(genre,pageNum);
    }
    
}

function nextPage() {
    
    let page = document.getElementById("now_page").innerText;
    let pageNum = parseInt(page)+1;
    let genre = document.getElementsByClassName("sort-clicked")[0].innerHTML;
    document.getElementById("now_page").innerText=pageNum;
    ShowMoviesBySort13(genre,pageNum);
}