function showMoviesInTheater() {
    let url = "http://localhost:8080/movies/in_theater";
    request('get', url, (data) => {
        changeMovieInTheaterHtml(data);
    });
}

function changeMovieInTheaterHtml(data) {
    let divs = "<p>热映影片</p>" + generateMoviesHtml(data);
    document.getElementById("recommend").innerHTML = divs;
}