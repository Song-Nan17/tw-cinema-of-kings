function getIdFromUrl() {
    const url = document.location.toString();
    return url.split('id=')[1];
}

function showMovieDetails() {
    const id = getIdFromUrl();
    const url = `http://localhost:8080/movies/${id}`;
    request('get', url, (data) => {
        generateDetails(data);
        generateComments(data);
        generateSameMovies(data);
    })
}

function generateDetails(movie) {
    generateName(movie);
    generateBasic(movie);
}

function generateName(movie) {
    let nameString;
    if (movie.title != movie.originalTitle) {
        nameString = `${movie.title} — ${movie.originalTitle}`;
    } else {
        nameString = movie.title;
    }
    document.getElementById('name').innerHTML = nameString;
}

function generateBasic(movie) {
    document.getElementById('poster').src = movie.image;
    document.getElementById('directors').innerHTML = `导演：${movie.directors.map(director => director.name).join("，")}`;
    document.getElementById('casts').innerHTML = `主演：${movie.casts.map(cast => cast.name).join("，")}`;
    document.getElementById('genres').innerHTML = `类别：${movie.genres.map(genre => genre.name).join(',')}`;
    document.getElementById('year').innerHTML = `上映时间：${movie.year}`;
    document.getElementById('more').href = movie.alt;
    document.getElementById('content').innerHTML = `<p>剧情简介:</p>
                                                             <div>${movie.introduction}</div>`;
    showRatingDetails(movie);
}

function generateComments(movie) {
    const url = `http://localhost:8080/movies/${movie.id}/comments`;
    request('get', url, (data) => {
        showComments(data, movie);
    })
}

function generateStar(value) {
    let stars = ['☆', '☆', '☆', '☆', '☆'];
    return stars.map((star, index, arr) => {
        if (index < value - 1) {
            return '★';
        }
        return star;
    })
}

function showRatingDetails(movie) {
    document.getElementById('aboutRating').innerHTML =
        `<span id='rating'>${movie.rate}</span>
    <span>${generateStar(movie.rate / 2).join('')}</span>`
}

function showComments(data, movie) {
    const commentsList = displayComments(data.slice(0, 5));
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