const API_KEY = "838d721e4cc805544c744295d5d45809";
const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

console.log("before");
fetch(URL, options)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const movieContainer = document.getElementById("movie-container");
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error:", error));
console.log("after");

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    
    <span>Rating: ${movie.vote_average}</span>
  `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
}

const search_movie = async (event) => {
  event.preventDefault();
  const search_box = document.getElementsByClassName("search-box")[0];
  const search_keyword = search_box.value.toUpperCase();

  const search_movie_list = all_movie_list.filter(({ title }) => title.toUpperCase().includes(search_keyword));

  search_movie_list.length > 0 ? renderMovies(search_movie_list) : alert("검색 결과가 없습니다.");
};

const renderMovies = (movies) => {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";
  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });
};

// 페이지 로드 시 영화 목록 로드
window.onload = () => {
  fetch(URL, options)
    .then((response) => response.json())
    .then((data) => {
      all_movie_list = data.results;
      renderMovies(all_movie_list);
    })
    .catch((error) => console.error("Error:", error));
};
