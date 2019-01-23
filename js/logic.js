function formatGenresToArray(data) {
    return data.map(ele => {
        ele.genres = ele.genres.split(',');
        return ele;
    })
}


function getSortArr() {
    const movies = getMoviesFromStorage();
    const movieSorts = movies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), ['全部']);
    return movieSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);
}

function getSearchSort() {
    const searchMovies = getSearchMovies();
    const searchSorts = searchMovies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), []);
    return searchSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);

}

function getSearchMovies() {
    const searchContent = getSearchContentFromUrl();
    if (Number(searchContent)) {
        return getIdSearchResult(searchContent);
    } else {
        return getNameSearchResult(searchContent);
    }
}

function getSortName(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        changeClickedSortColor(event);
        storageSortName(event.target.innerHTML);
        return event.target.innerHTML;
    }
    return
}

function getMoviesBySort(sortName, movies) {
    if (sortName !== '全部') {
        movies = movies.filter(movie => movie.genres.includes(sortName));
    }
    return movies;
}

function getMovieDivs(displayMovies) {
    return displayMovies.map(movie =>
        `<div>
      <img class="moviePoster" src=${movie.image} onerror="showErrorImg(event)" />
      <p class="movieName">${movie.title}</p>
      <p class="movieScore">评分：${movie.rating}</p>
      </div>`);
}

function replaceImgSrc(event) {
    event.src="https://img3.doubanio.com/view/movie_poster_cover/spst/public/p692813374.jpg";
}

function getMovieId(event) {
    if (event.target.tagName.toLowerCase() === 'img') {
        const movies = getMoviesFromStorage();
        const movie = movies.find(movie => movie.image === event.target.src);
        return movie.id; 
    }
}

function isToMovieDetailsPage(movieId) {
    if (movieId) {
        window.location = `movie_details.html?id=${movieId}`;
    }
}

function getSearchContent() {
    return document.getElementById('search-box').value;
}

function isToMovieSearchPage(searchContent) {
    if (!searchContent) {
        return
    }
    let searchUrl = 'search_page.html?search=' + encodeURI(searchContent);
    window.location.href = searchUrl;
}

function getSearchContentFromUrl() {
    const url = window.location.href;
    let searchContent = url.split('search=')[1];
    return decodeURI(searchContent);
}

function getAndShowSearchResult() {
    let searchResult = getSearchResult();
    showSearchResult(searchResult);
}

function getSearchResult() {
    const searchContent = getSearchContentFromUrl();

    if (Number(searchContent)) {
        return getIdSearchResult(searchContent);
    } else {
        return getNameSearchResult(searchContent);
    }

}

function getIdSearchResult(movieId) {
    const movies = getMoviesFromStorage();
    return movies.filter(movie => movie.id === movieId);
}

function getNameSearchResult(movieName) {
    const movies = getMoviesFromStorage();
    return movies.filter(movie => movie.title.includes(movieName)) && 
    movies.filter(movie => movie.original_title.toLowerCase().includes(movieName.toLowerCase()));
}

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

function getIdFromUrl() {
    const url = document.location.toString();
    return url.split('id=')[1];
}

function getSelectedMovie(id) {
    const movies = getMoviesFromStorage();
    return movies.find(movie => movie.id === id);
}

function generateDetails(movie) {
    generateName(movie);
    generateBasic(movie);
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

function generateBasic(movie) {
    document.getElementById('poster').src = movie.image;
    document.getElementById('directors').innerHTML = `导演：${movie.directors}`;
    document.getElementById('casts').innerHTML = `主演：${movie.casts}`;
    document.getElementById('genres').innerHTML = `类别：${movie.genres.join(',')}`;
    document.getElementById('year').innerHTML = `上映时间：${movie.year}`;
    document.getElementById('more').href = movie.alt;
}

function generateComments(movie) {
    const url = `https://api.douban.com/v2/movie/subject/${movie.id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=5&client=&udid=`;
    request('get', url, (data) => {
        showComments(data);
        showOther(data);
        showRatingDetails(data);
    })
}

function generateStar(value) {
    let stars = ['☆', '☆', '☆', '☆', '☆'];
    return stars.map((star, index, arr) => {
        if (index < value) {
            return '★';
        }
        return star;
    })
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