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
    const url = `http://localhost:8080/movies/${movie.id}/comments`;
        //`https://api.douban.com/v2/movie/subject/${movie.id}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=5&client=&udid=`;
    request('get', url, (data) => {
        showComments(data, movie);
        //showOther(data);
        //showRatingDetails(data);
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

function showComments(data, movie) {
    const commentsList = displayComments(data.slice(0,5));
    document.getElementById('comments').innerHTML =
        `<p>${movie.title}的短评</p>
     ${commentsList.join('<hr>')}`;
}

function displayComments(comments) {
    return comments.map(comment =>
        `<div>   
            <p class='aboutAuthor'>
                <span class='author'>${comment.author}</span>  
                <span class='star'>${generateStar(comment.rate).join('')}</span>
                ${comment.time} 
            </p>
            <p class='comment'>${comment.content}</p>
        </div>`)
}