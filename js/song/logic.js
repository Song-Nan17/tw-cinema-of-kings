function formatMovies(data) {
  return data.map(ele => {
    ele.genres = ele.genres.split(',');
    return ele;
  });
}

function showSortTable() {
  const sortArr = getSortArr();
  const liTags = sortArr.map(sortName => `<li>${sortName}</li>`);
  document.getElementById('sortTable').innerHTML = liTags.join('\n');
}

function getSortArr() {
  const movies = getMovies();
  const movieSort = movies.reduce((acc, current) => acc = acc.concat(current.genres), ['全部']);
  return movieSort.filter((ele, index, arr) => arr.indexOf(ele) === index);
}

function toGetSortName(event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    changeClickedSortColor(event);
    return event.target.innerHTML;
  }
}

function changeClickedSortColor(event) {
  const liTags = document.getElementsByTagName('li');
  for (i = 0; i < liTags.length; i++) {
    liTags[i].style.color = 'black';
  }
  event.target.style.color = 'red';
}

function showMoviesBySort(sortName) {
  const diaplayMovies = getDisplayMovies(sortName);
  const movieDivs = getDisplay(diaplayMovies);
  document.getElementById('highScoreMovies').innerHTML = movieDivs.join('\n');
}

function getDisplayMovies(sortName) {
  let movies = getMovies();
  if (sortName !== '全部') {
    movies = movies.filter(movie => movie.genres.includes(sortName));
  }
  return movies;
}

function getDisplay(diaplayMovies) {
  return diaplayMovies.map(movie =>
    `<div>
    <img class="moviePoster" src=${movie.image}>
    <p class="movieName">${movie.title}</p>
    <p class="movieScore">评分：${movie.rating}</p>
    </div>`);
}

function showHighScoreMovies() {
  const highScoreMovies = getMoviesScoreAbove(8.8)
  const randoms = generateRandoms(highScoreMovies.length, 12);
  const randomMovies = randoms.map(random => highScoreMovies[random]);
  const movieDivs = getDisplay(randomMovies);
  document.getElementById('highScoreMovies').innerHTML = `
  <p>高分电影推荐</p>
  ${movieDivs.join('\n')}`;
}

function getMoviesScoreAbove(number) {
  const movies = getMovies();
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