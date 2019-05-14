function getMoviesScoreAbove(number) {
    const movies = getMoviesFromStorage();
    return movies.filter(movie => Number(movie.rating) >= number);
}

function generateRandoms(count, randomsLength) {
    const randoms = [];
    while (randoms.length < randomsLength) {
        const random = parseInt(Math.random() * count);
        if (!randoms.includes(random)) {
            randoms.push(random);
        }
    }
    return randoms;
}

function generateSameMovies(movie) {
    const url = `http://localhost:8080/movies?size=268`;
    request('get', url, (data) => {
        const sameMovies = getSameMovies(movie, data.content);
        showSameMovies(sameMovies);
    })
}

function getSameMovies(selectedMovie, movies) {
    const genresName = getGenres(selectedMovie);
    const sameMovies = movies.filter(movie => getGenres(movie).some(genre => genresName.includes(genre))
        && movie.id !== selectedMovie.id);
    return sameMovies;
}

function getGenres(movie) {
    const genresName = movie.genres.map(genre => genre.name);
    console.log(genresName);
    return genresName;
}

function showHighScoreMovies() {
    // const highScoreMovies = getMoviesScoreAbove(8.8)
    // const randoms = generateRandoms(highScoreMovies.length, 12);
    // const randomMovies = randoms.map(random => highScoreMovies[random]);
    let elementId = "recommend";
    let url = "http://localhost:8080/movies/in_theater";
    request('get', url, (data) => {
        ShowMovies13(data, elementId);
    });
    // const movieDivs = getMovieDivs(randomMovies);
    // document.getElementById('recommend').innerHTML = `
    //   <p>高分电影推荐</p>
    //   ${movieDivs.join('\n')}`;
}

function showSameMovies(movies) {
    let movieDivs = [];
    if (movies.length <= 12) {
        movieDivs = getMovieDivs(movies);
    } else {
        const randoms = generateRandoms(movies.length, 12);
        const randomMovies = randoms.map(random => movies[random]);
        movieDivs = getMovieDivs(randomMovies);
    }
    document.getElementById('recommend').innerHTML = `
    <p>同类电影推荐</p>
    ${movieDivs.join('\n')}`;
}