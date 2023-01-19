const body = document.querySelector("body");
const movies = document.querySelector(".movies");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const modal = document.querySelector(".modal");
const imgTheme = document.querySelector(".btn-theme");
const pHighlightDescription = document.querySelector(".highlight__description");

// localStorage.setItem("theme", "light");

if (
  localStorage.getItem("theme") === "light" ||
  !localStorage.getItem("theme")
) {
  // console.log(imgTheme.src);
  imgTheme.src = "./assets/light-mode.svg";
  body.style.setProperty("--color", "#000");
  body.style.setProperty("--background-color", "#ffffff");
  body.style.setProperty("--highlight-background", "#fff");
  body.style.setProperty("--highlight-description", "#000000");
  body.style.setProperty("--highlight-color", "rgba(0, 0, 0, 0.7)");
  btnNext.src = "./assets/seta-direita-preta.svg";
  btnPrev.src = "./assets/seta-esquerda-preta.svg";
} else {
  imgTheme.src = "./assets/dark-mode.svg";
  body.style.setProperty("--color", "#fff");
  body.style.setProperty("--background-color", "#242424");
  body.style.setProperty("--highlight-background", "#454545");
  body.style.setProperty("--highlight-description", "#ffffff");
  body.style.setProperty("--highlight-color", "rgba(250, 250, 250, 0.7)");
  btnNext.src = "./assets/seta-direita-branca.svg";
  btnPrev.src = "./assets/seta-esquerda-branca.svg";
}

imgTheme.addEventListener("click", () => {
  const themeCurrent = localStorage.getItem("theme");
  if (themeCurrent === "dark") {
    imgTheme.src = "./assets/light-mode.svg";
    localStorage.setItem("theme", "light");
    body.style.setProperty("--background-color", "#ffffff");
    body.style.setProperty("--highlight-background", "#fff");
    body.style.setProperty("--color", "#000");
    body.style.setProperty("--highlight-color", "rgba(0, 0, 0, 0.7)");
    body.style.setProperty("--highlight-description", "#000000");
    btnNext.src = "./assets/seta-direita-preta.svg";
    btnPrev.src = "./assets/seta-esquerda-preta.svg";
  } else {
    imgTheme.src = "./assets/dark-mode.svg";
    localStorage.setItem("theme", "dark");
    body.style.setProperty("--background-color", "#242424");
    body.style.setProperty("--highlight-background", "#454545");
    body.style.setProperty("--color", "#fff");
    body.style.setProperty("--highlight-description", "#ffffff");
    body.style.setProperty("--highlight-color", "rgba(250, 250, 250, 0.7)");
    btnNext.src = "./assets/seta-direita-branca.svg";
    btnPrev.src = "./assets/seta-esqueda-branca.svg";
  }
  // console.log(localStorage.getItem("theme"));
});

const formatDate = (date) => {
  const monthsOfTheYear = [
    {
      numberMonth: "01",
      month: "JANEIRO",
    },
    {
      numberMonth: "02",
      month: "FEVEREIRO",
    },
    {
      numberMonth: "03",
      month: "MARÇO",
    },
    {
      numberMonth: "04",
      month: "ABRIL",
    },
    {
      numberMonth: "05",
      month: "MAIO",
    },
    {
      numberMonth: "06",
      month: "JUNHO",
    },
    {
      numberMonth: "07",
      month: "JULHO",
    },
    {
      numberMonth: "08",
      month: "AGOSTO",
    },
    {
      numberMonth: "09",
      month: "SETEMBRO",
    },
    {
      numberMonth: "10",
      month: "OUTUBRO",
    },
    {
      numberMonth: "11",
      month: "NOVEMBRO",
    },
    {
      numberMonth: "12",
      month: "DEZEMBRO",
    },
  ];

  let componentsDate = date.split("-");
  let monthMovie = monthsOfTheYear.find((item) => {
    return item.numberMonth === componentsDate[1];
  });

  return `${componentsDate[2]} DE ${monthMovie.month} DE ${componentsDate[0]}`;
};

(async () => {
  try {
    const request = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false"
    );

    const response = await request.json();
    let results = response.results;

    let multipleFive = 5;
    btnPrev.style.display = "none";
    let arrayMovies = [];
    let initial = 0;

    // const highlight = document.querySelector(".highlight");
    const highlightVideoLink = document.querySelector(".highlight__video-link");
    const highlightVideo = document.querySelector(".highlight__video");
    // const highlightInfo = document.querySelector(".highlight__info");
    // const highlightTitleRating = document.querySelector(
    //   ".highlight__title-rating"
    // );
    const highlightTitle = document.querySelector(".highlight__title");
    const highlightRating = document.querySelector(".highlight__rating");
    // const highlightGenreLaunch = document.querySelector(
    //   ".highlight__genre-launch"
    // );
    const highlightGenres = document.querySelector(".highlight__genres");
    const highlightLaunch = document.querySelector(".highlight__launch");
    const highlightDescription = document.querySelector(
      ".highlight__description"
    );

    function initializePagination() {
      results.forEach((item, index) => {
        const movie = document.createElement("div");
        const movieInfo = document.createElement("div");
        const movieTitle = document.createElement("span");
        const movieRating = document.createElement("span");
        const imgMovieRating = document.createElement("img");
        const classificationMovieRating = document.createElement("span");

        movie.classList.add("movie");
        movieInfo.classList.add("movie__info");
        movieTitle.classList.add("movie__title");
        movieRating.classList.add("movie__rating");
        classificationMovieRating.classList.add("movie__rating");

        movie.style.backgroundImage = `url(${item.poster_path})`;
        movieTitle.textContent = item.title;
        classificationMovieRating.textContent = item.vote_average;
        imgMovieRating.src = "./assets/estrela.svg";
        imgMovieRating.alt = "Estrela";

        movieRating.append(imgMovieRating);
        movieRating.append(classificationMovieRating);
        movieInfo.append(movieTitle);
        movieInfo.append(movieRating);
        movie.append(movieInfo);
        arrayMovies.push(movie);
        if (index < multipleFive) {
          movies.append(movie);
        }
      });
    }

    initializePagination();
    showModal();

    btnNext.addEventListener("click", () => {
      movies.textContent = "";

      if (btnPrev.style.display === "none") {
        btnPrev.style.display = "flex";
      }

      initial = multipleFive;
      multipleFive += 5;

      if (multipleFive >= arrayMovies.length) {
        btnNext.style.display = "none";
      }

      for (let i = initial; i < multipleFive; i++) {
        // console.log(i);
        if (arrayMovies[i] === undefined) {
          arrayMovies.splice(i, 1);
        } else {
          movies.append(arrayMovies[i]);
        }
      }
    });

    btnPrev.addEventListener("click", () => {
      movies.textContent = "";

      if (btnNext.style.display === "none") {
        btnNext.style.display = "flex";
      }

      multipleFive -= 5;
      initial = multipleFive - 5;

      if (multipleFive <= 5) {
        btnPrev.style.display = "none";
      }

      for (let i = initial; i < multipleFive; i++) {
        // console.log(i);
        movies.append(arrayMovies[i]);
      }
    });

    const input = document.querySelector(".input");
    let arrayInitialMovies = arrayMovies;

    input.addEventListener("keydown", async (e) => {
      if (e.code === "Enter" && input.value) {
        arrayMovies = [];
        movies.textContent = "";

        if (multipleFive >= 5) {
          multipleFive = 5;
          btnPrev.style.display = "none";
        }

        const requestSearchMovies = await fetch(
          `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false**&query=${input.value}`
        );

        const responseSearchMovies = await requestSearchMovies.json();

        results = responseSearchMovies.results;

        results.forEach((item, index) => {
          const movie = document.createElement("div");
          const movieInfo = document.createElement("div");
          const movieTitle = document.createElement("span");
          const movieRating = document.createElement("span");
          const imgMovieRating = document.createElement("img");
          const classificationMovieRating = document.createElement("span");

          movie.classList.add("movie");
          movieInfo.classList.add("movie__info");
          movieTitle.classList.add("movie__title");
          movieRating.classList.add("movie__rating");
          classificationMovieRating.classList.add("movie__rating");

          movie.style.backgroundImage = `url(${item.poster_path})`;
          movieTitle.textContent = item.title;
          classificationMovieRating.textContent = item.vote_average;
          imgMovieRating.src = "./assets/estrela.svg";
          imgMovieRating.alt = "Estrela";

          movieRating.append(imgMovieRating);
          movieRating.append(classificationMovieRating);
          movieInfo.append(movieTitle);
          movieInfo.append(movieRating);
          movie.append(movieInfo);
          arrayMovies.push(movie);
          if (index < multipleFive) {
            movies.append(movie);
          }
        });
        if (arrayMovies.length <= 5) {
          btnNext.style.display = "none";
        } else {
          btnNext.style.display = "flex";
        }

        showModal();
        input.value = "";
      } else if (e.code === "Enter" && input.value === "") {
        movies.textContent = "";
        arrayMovies = arrayInitialMovies;
        results = response.results;
        initial = 0;
        multipleFive = 5;

        btnPrev.style.display = "none";
        btnNext.style.display = "flex";

        for (let i = initial; i < 5; i++) {
          movies.append(arrayMovies[i]);
        }

        // showModal();
        console.log(movies);

        // initializePagination();
        showModal();
        input.value = "";
      }
    });

    const requestEndPointGeneral = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR"
    );

    const requestEndPointVideo = await fetch(
      "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR"
    );

    const responseEndPointGeneral = await requestEndPointGeneral.json();
    const responseEndPointVideo = await requestEndPointVideo.json();

    function showModal() {
      arrayMovies.forEach((item, index) => {
        const modalTitle = document.querySelector(".modal__title");
        const modalImg = document.querySelector(".modal__img");
        const modalDescription = document.querySelector(".modal__description");
        const modalAverage = document.querySelector(".modal__average");
        const modalClose = document.querySelector(".modal__close");
        const modalGenres = document.querySelector(".modal__genres");

        item.addEventListener("click", async () => {
          modal.classList.remove("hidden");
          const requestEndPointInfoMovie = await fetch(
            `https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${results[index].id}?language=pt-BR`
          );
          const responseEndPointInfoMovie =
            await requestEndPointInfoMovie.json();
          modalTitle.textContent = responseEndPointInfoMovie.title;
          modalImg.src = responseEndPointInfoMovie.backdrop_path;
          modalDescription.textContent = responseEndPointInfoMovie.overview;
          modalAverage.textContent = responseEndPointInfoMovie.vote_average;

          const moviesGenres = responseEndPointInfoMovie.genres;

          moviesGenres.forEach((item) => {
            const modalGenre = document.createElement("span");
            modalGenre.classList.add("modal__genre");
            modalGenre.textContent = item.name;

            modalGenres.append(modalGenre);
          });

          modal.addEventListener("click", () => {
            modal.classList.add("hidden");
            modalGenres.textContent = "";
          });

          modalClose.addEventListener("click", () => {
            modal.classList.add("hidden");
            modalGenres.textContent = "";
          });
        });
      });
    }

    highlightVideo.style.backgroundImage = `url(${responseEndPointGeneral.backdrop_path})`;
    highlightTitle.textContent = responseEndPointGeneral.title;
    highlightRating.textContent = responseEndPointGeneral.vote_average;
    highlightGenres.textContent = "";

    const arrayGenres = responseEndPointGeneral.genres;
    arrayGenres.forEach((item, index) => {
      if (index === arrayGenres.length - 1) {
        highlightGenres.textContent += `${item.name} `;
      } else {
        highlightGenres.textContent += `${item.name}, `;
      }
    });
    let date = responseEndPointGeneral.release_date;

    highlightLaunch.textContent = formatDate(date);
    highlightDescription.textContent = responseEndPointGeneral.overview;
    highlightVideoLink.href = `https://www.youtube.com/watch?v=${responseEndPointVideo.results[0].key}`;
  } catch (error) {
    console.log(error.message);
  }
})();
