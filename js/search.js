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
        ShowResultMovies(data,"sortMovies");
    } else {
      document.getElementById('sortMovies').innerHTML = `
      <p class="noResult">抱歉，没有找到<a class="keyword">“${getSearchContentFromUrl()}”</a>的相关搜索结果</p>`;
    }
  }

function ShowResultMovies(data, elementId) {
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

