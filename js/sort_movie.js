
function showMovieSortTable() {
    const url = `http://localhost:8080/genres`;
    request('get', url, (data) => {
        ShowGenres(data);
    });
    // let movies = getMoviesFromStorage();
    // let sortMovies = getMoviesBySort('全部', movies);
    // storageSortMovies(sortMovies);
    // showMoviesBySort(sortMovies, 12);
}

function ShowGenres(data) {
    let genres = ['<li class="sort-clicked">全部</li>'];
    for (let i = 0; i < data.length; i++) {
        genres.push(`<li >${data[i].name}</li>`);
    }
    document.getElementById('movieSortTable').innerHTML = genres.join("\n");
}

function getSortArr() {
    const movies = getMoviesFromStorage();
    const movieSorts = movies.reduce((sortArr, movie) => sortArr = sortArr.concat(movie.genres), ['全部']);
    return movieSorts.filter((sort, index, sortArr) => sortArr.indexOf(sort) === index);
}

function getSortName(event) {
    let name = "";
    if (event.target.tagName.toLowerCase() === 'li') {
        changeClickedLiClassName(event);
        // storageSortName(event.target.innerHTML);
        name+= event.target.innerHTML;
    }
    return name;
}

// function getMoviesBySort(sortName, movies) {
//     if (sortName !== '全部') {
//         movies = movies.filter(movie => movie.genres.includes(sortName));
//     }
//     return movies;
// }

function generatePageButtons(number) {
    let numbers = [];
    numbers.length = Math.ceil(number / 12);
    numbers.fill(0);
    let buttons = numbers.map((number, index, arr) =>
        `<button type="button" id="${index}" class="page-button" onclick="switchMovies(this)">${index + 1}</button>`);
    return buttons.join("\n");
}

function showSortMoviesByPage(event) {
    let sortMovies = getSortMoviesInStorage();
    let movieDivs = getMovieDivs(sortMovies);
    let startNumber = event.id * 12;
    document.getElementById('sortMovies').innerHTML = `${movieDivs.slice(startNumber, startNumber + 12).join('\n')}
      <form class="page">${generatePageButtons(sortMovies.length)}</form>`;
}

function showSearchSortTable() {
    const searchSorts = getSearchSort();
    if (searchSorts.length > 0) {
        const liTags = searchSorts.map(sortName => `<li>${sortName}</li>`);
        document.getElementById('releventSort').innerHTML = `相关分类`;
        document.getElementById('movieSortTable').innerHTML = liTags.join('\n');
    }
}

function toShowMoviesBySort(event) {
    const sortName = getSortName(event);
    if(sortName.length>1) {
        document.getElementById("now_page").innerText=1;
        ShowMoviesBySort13(sortName,0);
    }
    // const movies = getMoviesFromStorage();
    // const sortMovies = getMoviesBySort(sortName, movies);
    // storageSortMovies(sortMovies);
    // showMoviesBySort(sortMovies, 12);
}

function ShowMoviesBySort13(sortName,page) {
    let url = `http://localhost:8080/movies?page=${page}&size=12`;
    if (sortName !== '全部') {
        url += `&genre=${sortName}&title=""`;
    }
    request('get', url, (data) => {
        ShowMovies13(data,"sortMovies");
    });
}

function ShowMovies13(data, elementId) {
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
    if(elementId=="recommend") {
        divs="<p>热映影片</p>"+divs;   
    }else{
        let page = document.getElementById("now_page").innerText;
        divs+=
        `<p id="page_button"><button class="change_page" onclick="lastPage()">上一页</button><span id="now_page">${page}</span><button class="change_page" onclick="nextPage()">下一页</button></p>`
    }
    document.getElementById(elementId).innerHTML = divs;
    

    //         movies = movies.filter(movie => movie.genres.includes(sortName));
    //     }
}    //     return movies;


function showMoviesBySearchSort(event) {
    const sortName = getSortName(event);
    const searchMoives = getSearchResult();
    const sortMovies = getMoviesBySort(sortName, searchMoives);
    storageSortMovies(sortMovies);
    showMoviesBySort(sortMovies, 12);
}

function showMoviesBySort(sortMovies, movieNumber) {
    const movieDivs = getMovieDivs(sortMovies);
    document.getElementById('sortMovies').innerHTML = `${movieDivs.slice(0, movieNumber).join('\n')}
      <form class="page">${generatePageButtons(sortMovies.length)}</form>`;
    //   <p id="moreMovies" onclick = "showMoreMoviesListener()">更多>></p>
}

function showMoreMovies() {
    const sortMovies = getSortMoviesInStorage();
    showMoviesBySort(sortMovies);
}



