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

    const adLeft = "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p692813374.jpg";
    const adMiddle = "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1910813120.jpg";
    const adRight = "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1910825503.jpg";
    let images = [adLeft, adMiddle, adRight];

    storageInit(data);
    showMovieSortTable();
    showHighScoreMovies();
    displayAd(images)
}

function toShowMoviesBySort(event) {
    const sortName = getSortName(event);
    showMoviesBySort(sortName);
}
function onloadShowMovie() {
    storageInit(data);
    showMovieDetails();
}

function toMovieDetailsPage(event) {
    const movieId = getMovieId(event);
    isToMovieDetailsPage(movieId);
}