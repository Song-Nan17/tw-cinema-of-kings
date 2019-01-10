function formatGenresToArray(data) {
  return data.map(ele => {
    ele.genres = ele.genres.split(',');
    return ele;
  })
}
function showMovieDetails() {
  const movie = getSelectedMovie();
  generateDetails(movie);
  generateSameMovies(movie);
}
function getSelectedMovie() {
  const id = "1291546";
  const movies = getMoviesFromStorage();
  let selectedMovie = {};
  movies.forEach(movie => {
    if (movie.id === id) {
      selectedMovie = movie;
    }
  })
  console.log(selectedMovie);
  return selectedMovie;
}

function generateDetails(movie) {
  generateName(movie);
  generateOther(movie);
}
function generateName(movie) {
  let nameString;
  if (movie.title != movie.original_title) {
    nameString = `${movie.title} — ${movie.original_title}`;
  } else {
    nameString = movie.title;
  }
  document.getElementById('name').innerHTML = nameString;
}
function generateOther(movie) {
  document.getElementById('poster').src = movie.image;
  document.getElementById('directors').innerHTML = `导演：${movie.directors}`;
  document.getElementById('casts').innerHTML = `主演：${movie.casts}`;
  document.getElementById('genres').innerHTML = `类别：${movie.genres.join(',')}`;
  document.getElementById('year').innerHTML = `上映时间：${movie.year}`;
  document.getElementById('rating').innerHTML = `豆瓣评分：${movie.rating}`;
}
function generateSameMovies(movie) {
  const sameMovies = getSameMovies(movie);
  // showSameMovies(sameMovies);
}
function getSameMovies(selectedMovie) {
  const movies = getMoviesFromStorage();
  const sameMovies = movies.filter(movie => movie.genres.some(genre => selectedMovie.genres.includes(genre)))
  return sameMovies;
}