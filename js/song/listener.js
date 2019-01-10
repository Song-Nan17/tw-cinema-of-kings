function onloadPageListener() {
  const movies = formatMovies(data);
  setMovies(movies);
  showSortTable();
  showHighScoreMovies();
}

function toShowMoviesBySort(event) {
  const sortName = toGetSortName(event);
  showMoviesBySort(sortName);
}