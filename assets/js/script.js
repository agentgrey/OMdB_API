// API Key
const apiKey = '93059205'; 

// Variables from ejs file
const resultsContainer = document.getElementById('search-results');
const searchBar = document.getElementById('search-input');

// Event listener for search
searchBar.addEventListener('input', ()=>(searchMovie(searchBar.value)));

// Function to fetch data from the API
async function searchMovie(movie) {
  resultsContainer.innerHTML = ''; 
  if (movie === '') return;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`);
    const data = await response.json();

    if (data.Search) {
      data.Search.forEach(movie => {
        const movieCard = createMovieCard(movie);
        resultsContainer.appendChild(movieCard);
      });
    } else {
      resultsContainer.innerHTML = '';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultsContainer.innerHTML = '<p>Error fetching data.</p>';
  }
}

// Create a movie card element
function createMovieCard(movie) {
  let html = '';
  html = 
  `
    <div class='result-card'>
      <img src=${movie.Poster} alt=${movie.Title}>
      <h2>${movie.Title}</h2>

      <div>
        <a href='playlist/private/add/${movie.imdbID}'><button>Add To Private Playlist</button></a>
        <a href='playlist/public/add/${movie.imdbID}'><button>Add To Public Playlist</button></a>
      </div>
    </div
  `
  const movieCard = document.createElement('div');
  movieCard.innerHTML = html;

  return movieCard;
}
