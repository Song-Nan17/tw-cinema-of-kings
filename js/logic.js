function formatGenresToArray(data) {
    return data.map(ele => {
        ele.genres = ele.genres.split(',');
        return ele;
    })
}

function slideShow() {
    const images = ["http://ww1.sinaimg.cn/large/a85d55ddly1fz3ttvmat8j20g4096gn8.jpg",
        "http://ww1.sinaimg.cn/large/a85d55ddly1fz3tydey73j20rs0goh3e.jpg",
        "http://ww1.sinaimg.cn/large/a85d55ddly1fz3u2l7hl0j21180n7q9z.jpg"];
    let i = 0;
    displayImage(images, i);
}
function displayImage(images, i) {
    document.getElementById('slideShowImg').src = images[i];
    let pageNumber = ['○', '○', '○'];
    pageNumber[i] = '●';
    document.getElementById('slideShowButton').innerHTML = pageNumber.join('');
    playImages(images, i);

}

function playImages(images, i) {
    setTimeout(() => {
        i++;
        displayImage(images, i % 3);
    }, 3000);
}

function showMovieSortTable() {
    const sortArr = getSortArr();
    const liTags = sortArr.map(sortName => `<li>${sortName}</li>`);
    document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
}

function getSortArr() {
    const movies = getMoviesFromStorage();
    const movieSorts = movies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), ['全部']);
    return movieSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);
}

function getSortName(event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        changeClickedSortColor(event);
        storageSortName(event.target.innerHTML);
        return event.target.innerHTML;
    }
    return
}

function changeClickedSortColor(event) {
    const liTags = document.getElementsByTagName('li');
    for (i = 0; i < liTags.length; i++) {
        liTags[i].style.color = 'black';
    }
    event.target.style.color = 'red';
}

function showMoviesBySort(sortName, movieNumber) {
    if (!sortName) {
        return
    }
    const displayMovies = getDisplayMovies(sortName);
    const movieDivs = getDisplay(displayMovies);
    if (!movieNumber || movieDivs.length <= movieNumber) {
        document.getElementById('recommend').innerHTML = movieDivs.join('\n');
    }
    else {
        document.getElementById('recommend').innerHTML = movieDivs.slice(0, 10).join('\n')
            + `<p id="moreMovies" onclick = "showMoreMovies()">更多>></p>`;
    }
}

function getDisplayMovies(sortName) {
    let movies = getMoviesFromStorage();
    if (sortName !== '全部') {
        movies = movies.filter(movie => movie.genres.includes(sortName));
    }
    return movies;
}

function getDisplay(displayMovies) {
    return displayMovies.map(movie =>
        `<div>
      <img class="moviePoster" src=${movie.image} />
      <p class="movieName">${movie.title}</p>
      <p class="movieScore">评分：${movie.rating}</p>
      </div>`);
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
        window.location = `movie-details.html?id=${movieId}`;
    }
}

function getSearchContent() {
    return document.getElementById('searchBox').value;
}

function isToMovieSearchPage(searchContent) {
    if (!searchContent) {
        return
    }
    window.location = `search-page.html?search=${searchContent}`;
}

function getSearchContentFromUrl() {
    const url = document.location.toString();
    return url.split('search=')[1];
}

function showSearchResult() {
    const searchContent = getSearchContentFromUrl();
    if (Number(searchContent) === searchContent) {
        showIdSearchResult(searchContent);
    }
    showNameSearchResult(searchContent);
}

function showIdSearchResult(movieId) {
    const movies = getMoviesFromStorage();
    let idResult = movies.filter(movie => movie.id == movieId);
    const showResult = getDisplay(idResult);
    document.getElementById('recommend').innerHTML = `
    ${showResult.join('\n')}`;
}

function showNameSearchResult(movieName) {
    const movies = getMoviesFromStorage();
    let nameResults = movies.filter(movie => movie.name.includes(movieName));
    const showResult = getDisplay(nameResults);
    document.getElementById('recommend').innerHTML = `
      ${showResult.join('\n')}`;
}

function showHighScoreMovies() {
    const highScoreMovies = getMoviesScoreAbove(8.8)
    const randoms = generateRandoms(highScoreMovies.length, 10);
    const randomMovies = randoms.map(random => highScoreMovies[random]);
    const movieDivs = getDisplay(randomMovies);
    document.getElementById('recommend').innerHTML = `
    <p>高分电影推荐</p>
    ${movieDivs.join('\n')}`;
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

function showMovieDetails() {
    const id = getIdFromUrl();
    const movie = getSelectedMovie(id);
    generateDetails(movie);
    generateComments(movie);
    generateSameMovies(movie);
}
function getSelectedMovie(id) {
    const movies = getMoviesFromStorage();
    return movies.find(movie => movie.id === id);
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
    document.getElementById('more').href = movie.alt;
}

function generateComments(movie) {
    const url = `https://api.douban.com/v2/movie/subject/${movie.id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=5&client=&udid=`;
    request('get', url, (data) => {
        showComments(data);
        console.log(data);
    })
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
function generateStar(value) {
    let stars = ['☆', '☆', '☆', '☆', '☆'];
    return stars.map((star, index, arr) => {
        if (index <= value - 1) {
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

function showSameMovies(movies) {
    const randoms = generateRandoms(movies.length, 10);
    const randomMovies = randoms.map(random => movies[random]);
    const movieDivs = getDisplay(randomMovies);
    document.getElementById('recommend').innerHTML = `
    <p class='title'>同类电影推荐</p>
    ${movieDivs.join('\n')}`;
}