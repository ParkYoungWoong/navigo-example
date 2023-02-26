const el = document.createElement('div')
el.classList.add('page')
el.innerHTML = /* html */ `
  <h1>Movie serach page!</h1>
  <input />
  <button>Search!</button>
  <ul></ul>
`

let searchText = ''
const inputEl = el.querySelector('input')
inputEl.addEventListener('input', event => {
  searchText = event.target.value
})
inputEl.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    searchMovies()
  }
})

const buttonEl = el.querySelector('button')
buttonEl.addEventListener('click', () => {
  searchMovies()
})

const ulEl = el.querySelector('ul')
async function searchMovies() {
  const movies = await fetchMovies(searchText)
  renderMovies(ulEl, movies)
}

async function fetchMovies(title) {
  const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${title}`)
  const json = await res.json()
  return json.Search
}
function renderMovies(elToRender, movies) {
  movies.forEach(movie => {
    const liEl = document.createElement('li')
    liEl.innerHTML = /* html */ `
      <a href="/movies/${movie.imdbID}">${movie.Title}</a>
    `
    elToRender.append(liEl)
  })
}

export default el