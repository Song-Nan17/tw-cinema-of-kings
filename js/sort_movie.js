function showMovieSortTable() {
    const url = `http://localhost:8080/genres`;
    request('get', url, (data) => {
        ShowGenres(data);
    });
}

function ShowGenres(data) {
    let genres = ['<li class="sort-clicked">全部</li>'];
    for (let i = 0; i < data.length; i++) {
        genres.push(`<li >${data[i].name}</li>`);
    }
    document.getElementById('movieSortTable').innerHTML = genres.join("\n");
}

function getSortName(event) {
    let name = "";
    if (event.target.tagName.toLowerCase() === 'li') {
        changeClickedLiClassName(event);
        name += event.target.innerHTML;
    }
    return name;
}

function changeClickedLiClassName(event) {
    const liTags = document.getElementById('movieSortTable').children;
    for (i = 0; i < liTags.length; i++) {
        liTags[i].className = '';
    }
    event.target.className = 'sort-clicked';
}

function toShowMoviesBySort(event) {
    const sortName = getSortName(event);
    if (sortName.length > 1) {
        document.getElementById("now_page").innerText = 1;
        ShowMoviesBySort(sortName, 0);
    }
}

function ShowMoviesBySort(sortName, page) {
    let url = `http://localhost:8080/movies?page=${page}&size=12`;
    if (sortName !== '全部') {
        url += `&genre=${sortName}&title=""`;
    }
    request('get', url, (data) => {
        changeSortMovieHtml(data);
    });
}

function changeSortMovieHtml(data) {
    let divs = generateMoviesHtml(data);
    let page = document.getElementById("now_page").innerText;
    divs += `<p id="page_button">
<button class="change_page" onclick="lastPageListener()">上一页</button>
<span id="now_page">${page}</span>
<button class="change_page" onclick="nextPageListener()">下一页</button>
</p>`;
    document.getElementById("sortMovies").innerHTML = divs;
}

function generateMoviesHtml(data) {
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
    return movies.join("\n");
}

function lastPage() {
    let page = document.getElementById("now_page").innerText;
    let pageNum = parseInt(page)-1;
    if(pageNum>0) {
        let genre = document.getElementsByClassName("sort-clicked")[0].innerHTML;
        document.getElementById("now_page").innerText=pageNum;
        ShowMoviesBySort(genre,pageNum);
    }
}

function nextPage() {
    let page = document.getElementById("now_page").innerText;
    let pageNum = parseInt(page)+1;
    let genre = document.getElementsByClassName("sort-clicked")[0].innerHTML;
    document.getElementById("now_page").innerText=pageNum;
    ShowMoviesBySort(genre,pageNum);
}


