// eventListener
function onloadPageListener() {
  const movies = formatMovies(data);
  setMovies(movies);
  showSortTable();
}


//logicProcess
function formatMovies(data) {
  return data.map(ele => {
    ele.genres = ele.genres.split(',');
    return ele;
  });
}

function showSortTable() {
  const sortArr = getSortArr();
  const liTags = sortArr.map(sortName => `<li>${sortName}</li>`);
  document.getElementById('sortTable').innerHTML=liTags.join('\n');
}

function getSortArr() {
  const movies = getMovies();
  const movieSort = movies.reduce((acc, current) => acc = acc.concat(current.genres), []);
  return movieSort.filter((ele, index, arr) => arr.indexOf(ele) === index);
}

// dataInteract
function setMovies(data) {
  let movies = JSON.stringify(data);
  localStorage.setItem('movies', movies);
}

function getMovies() {
  let movies = localStorage.getItem('movies');
  return JSON.parse(movies);
}