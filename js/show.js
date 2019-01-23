function slideShow() {
  let slideShowList = document.getElementsByClassName("slide-show-list")[0].children;
  let imgNumber = 0;
  setInterval(() => {
    playImage(slideShowList, imgNumber);
  }, 3000);
}

function playImage(slideShowList, imgNumber) {
  let listLength = slideShowList.length;
  imgNumber++;
  imgNumber = imgNumber % listLength;
  for (let i = 0; i < listLength; i++) {
    slideShowList[i].className = "";
    slideShowList[i].style.display = "none";
  }
  slideShowList[imgNumber].className = "current";
  let slideShowImg = document.getElementsByClassName("current");
  slideShowImg[0].style.display = "block";
}

function showMovieSortTable() {
  const sortArr = getSortArr();
  const liTags = sortArr.map(sortName => `<li>${sortName}</li>`);
  document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
}

function showSearchSortTable() {
  const searchSorts = getSearchSort();
  const liTags = searchSorts.map(sortName => `<li>${sortName}</li>`);
  document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
}

function changeClickedSortColor(event) {
  const liTags = document.getElementsByTagName('li');
  for (i = 0; i < liTags.length; i++) {
    liTags[i].style.color = 'black';
  }
  event.target.style.color = '#27a';
}

function toShowMoviesBySort(event) {
  const sortName = getSortName(event);
  const movies = getMoviesFromStorage();
  const sortMovies = getMoviesBySort(sortName, movies);
  storageSortMovies(sortMovies);
  showMoviesBySort(sortMovies, 10);
}

function showMoviesBySearchSort(event) {
  const sortName = getSortName(event);
  const searchMoives = getSearchResult();
  const sortMovies = getMoviesBySort(sortName, searchMoives);
  storageSortMovies(sortMovies);
  showMoviesBySort(sortMovies, 10);
}

function showMoviesBySort(sortMovies, movieNumber) {
  const movieDivs = getMovieDivs(sortMovies);
  if (!movieNumber || movieDivs.length <= movieNumber) {
    document.getElementById('recommend').innerHTML = movieDivs.join('\n');
  }
  else {
    document.getElementById('recommend').innerHTML = movieDivs.slice(0, movieNumber).join('\n')
      + `<p id="moreMovies" onclick = "showMoreMoviesListener()">更多>></p>`;
  }
}

function showMoreMovies() {
  const sortMovies = getSortMoviesInStorage();
  showMoviesBySort(sortMovies);
}

function showSearchResult(movies) {
  const showResult = getMovieDivs(movies);
  document.getElementById('recommend').innerHTML = `
  <p>搜索结果：</P>
  ${showResult.join('\n')}`;
}

function showHighScoreMovies() {
  const highScoreMovies = getMoviesScoreAbove(8.8)
  const randoms = generateRandoms(highScoreMovies.length, 10);
  const randomMovies = randoms.map(random => highScoreMovies[random]);
  const movieDivs = getMovieDivs(randomMovies);
  document.getElementById('recommend').innerHTML = `
    <p>高分电影推荐</p>
    ${movieDivs.join('\n')}`;
}

function showMovieDetails() {
  const id = getIdFromUrl();
  const movie = getSelectedMovie(id);
  generateDetails(movie);
  generateComments(movie);
  generateSameMovies(movie);
}

function showOther(data) {
  document.getElementById('durations').innerHTML = `片长：${data.subject.durations[0]}`;
}

function showRatingDetails(data) {
  document.getElementById('aboutRating').innerHTML =
    `<p id='rating'>${data.subject.rating.average}</p>
  <p>${generateStar(1).join('')} <span>${data.subject.rating.details[1]}</span></p>
  <p>${generateStar(2).join('')} <span>${data.subject.rating.details[2]}</span></p>
  <p>${generateStar(3).join('')} <span>${data.subject.rating.details[3]}</span></p>
  <p>${generateStar(4).join('')} <span>${data.subject.rating.details[4]}</span></p>
  <p>${generateStar(5).join('')} <span>${data.subject.rating.details[5]}</span></p>`
}

function showComments(data) {
  const commentsList = displayComments(data.comments);
  document.getElementById('comments').innerHTML =
    `<p>${data.subject.title}的短评</p>
   ${commentsList.join('<hr>')}`;
}

function displayComments(comments) {
  return comments.map(comment =>
    `<div>   
          <p class='aboutAuthor'>
              <span class='author'>${comment.author.name}</span>  
              <span class='star'>${generateStar(comment.rating.value).join('')}</span>
              ${comment.created_at} 
          </p>
          <p class='comment'>${comment.content}</p>
      </div>`)
}

function showSameMovies(movies) {
  let movieDivs = [];
  if (movies.length <= 10) {
    movieDivs = getMovieDivs(movies);
  } else {
    const randoms = generateRandoms(movies.length, 10);
    const randomMovies = randoms.map(random => movies[random]);
    movieDivs = getMovieDivs(randomMovies);
  }
  document.getElementById('recommend').innerHTML = `
  <p>同类电影推荐</p>
  ${movieDivs.join('\n')}`;
}