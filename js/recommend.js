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
    const sameMovies = getSameMovies(movie);
    showSameMovies(sameMovies);
}

function getSameMovies(selectedMovie) {
    const movies = getMoviesFromStorage();
    const sameMovies = movies.filter(movie => movie.genres.some(genre => selectedMovie.genres.includes(genre)
        && movie.id != selectedMovie.id));
    return sameMovies;
}

function showHighScoreMovies() {
    const highScoreMovies = getMoviesScoreAbove(8.8)
    const randoms = generateRandoms(highScoreMovies.length, 12);
    const randomMovies = randoms.map(random => highScoreMovies[random]);
    const movieDivs = getMovieDivs(randomMovies);
    document.getElementById('recommend').innerHTML = `
      <p>高分电影推荐</p>
      ${movieDivs.join('\n')}`;
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