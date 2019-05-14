// function getSearchSort() {
//     const searchMovies = getSearchMovies();
//     const searchSorts = searchMovies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), []);
//     return searchSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);

// }

// function getSearchMovies() {
//     const searchContent = getSearchContentFromUrl();
//     if (Number(searchContent)) {
//         return getIdSearchResult(searchContent);
//     } else {
//         return getNameSearchResult(searchContent);
//     }
// }

function getSearchContent() {
    return document.getElementById('search-box').value;
}

function getSearchContentFromUrl() {
    const url = window.location.href;
    let searchContent = url.split('search=')[1];
    return decodeURI(searchContent);
}

function getAndShowSearchResult(search,page) {
    let url = `http://localhost:8080/movies?title=${search}&page=${page}&size=12`;
    request('get', url, (data) => {
        showSearchResult(data);
        
    });
}

function showSearchResult(data) {
    if (data.content.length > 0) {
        ShowResultMovies13(data,"sortMovies");
    //   const showResult = getMovieDivs(movies);
    //   document.getElementById('recommend').innerHTML = `
    //   <p>搜索结果：</P>
    //   ${showResult.join('\n')}`;
    } else {
      document.getElementById('sortMovies').innerHTML = `
      <p class="noResult">抱歉，没有找到<a class="keyword">“${getSearchContentFromUrl()}”</a>的相关搜索结果</p>`;
    }
  }

function ShowResultMovies13(data, elementId) {
    let movies = [];
    for (let i = 0; i < data.content.length; i++) {
        let movie = data.content[i];
        let tag = `<div  onclick="toMovieDetailsPage(event)">
        <img class="moviePoster" id="${movie.id}" src=${movie.image} onerror="showErrorImg(this)" />
        <p class="movieName">${movie.title}</p>
        <p class="movieScore">${movie.rate}</p>
        </div>`
        movies.push(tag);
    }
    let divs = movies.join("\n");
        divs="<p>搜索结果：</p>"+divs;   
    document.getElementById(elementId).innerHTML = divs;
}

// function getSearchResult() {
//     const searchContent = getSearchContentFromUrl();
//     if (Number(searchContent)) {
//         return getIdSearchResult(searchContent);
//     } else {
//         return getNameSearchResult(searchContent);
//     }
// }

function getIdSearchResult(movieId) {
    const movies = getMoviesFromStorage();
    return movies.filter(movie => movie.id === movieId);
}

function getNameSearchResult(movieName) {
    const movies = getMoviesFromStorage();
    if (isChinese(movieName)) {
        return movies.filter(movie => movie.title.includes(movieName));
    } else {
        return movies.filter(movie => movie.original_title.toLowerCase().includes(movieName.toLowerCase()));
    }
}

function isChinese(string) {
    let chars = string.split('');
    return chars.every(char => char >= '\u4e00' && char <= '\u9fa5');
}

