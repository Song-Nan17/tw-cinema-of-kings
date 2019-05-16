function getMovieId(event) {
    if (event.target.tagName.toLowerCase() === 'img') {
        return event.target.id;
    }
}

function isToMovieDetailsPage(movieId) {
    if (movieId) {
        window.location = `movie_details.html?id=${movieId}`;
    }
}

function isToMovieSearchPage(searchContent) {
    if (!searchContent) {
        return
    }
    let searchUrl = 'search_page.html?search=' + encodeURI(searchContent);
    window.location.href = searchUrl;
}

function fixHeader() {
    let header = document.getElementsByTagName('header')[0];
    if (document.documentElement.scrollTop > 430) {
        header.className="";
    } else {
        header.className="header-unfixed";
    }
}