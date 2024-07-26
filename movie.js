// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = '838d721e4cc805544c744295d5d45809';
const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

console.log('before')
fetch(URL)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    const movieContainer = document.getElementById('movie-container');
    movies.forEach(movie => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error:', error));
console.log('after')



// 영화 카드를 생성하는 함수
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
  `;
  card.addEventListener('click', () => alert(`Movie ID: ${movie.id}`));
  return card;
}



// 영화 카드를 화면에 렌더링하는 함수
const renderMovies = (movies) => {
  const container = document.getElementById('moviesContainer');
  container.innerHTML = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const card = createMovieCard(movie);
    container.appendChild(card);
  }
};