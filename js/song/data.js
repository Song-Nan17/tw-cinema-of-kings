function setMovies(data) {
  const movies = JSON.stringify(data);
  localStorage.setItem('movies', movies);
}

function getMovies() {
  const movies = localStorage.getItem('movies');
  return JSON.parse(movies);
}
