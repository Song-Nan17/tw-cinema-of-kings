function slideShow() {
  let slideShowList = document.getElementsByClassName("slide-show-list")[0].children;
  let imgNumber = 0;
  setInterval(() => {
  imgNumber++;
    playImage(slideShowList, imgNumber);
  }, 3000);
}

function playImage(slideShowList, imgNumber) {
  let listLength = slideShowList.length;
  imgNumber = imgNumber % listLength;
  for (let i = 0; i < listLength; i++) {
    slideShowList[i].className = "";
    slideShowList[i].style.display = "none";
  }
  slideShowList[imgNumber].className = "current";
  let slideShowImg = document.getElementsByClassName("current");
  slideShowImg[0].style.display = "block";
}

function replaceImgSrc(event) {
  event.src = "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p692813374.jpg";
}