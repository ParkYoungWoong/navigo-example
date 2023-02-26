const el = document.createElement('div')
el.classList.add('page')

console.log(window.navigoRoute)
fetchMovieDetails(window.navigoRoute.data.abc)
  .then(movie => {
    el.innerHTML = /* html */ `
      <h1>${movie.Title}</h1>
      <p>${movie.Plot}</p>
      <img src="${movie.Poster}" alt="${movie.Title}" />
    `
  })

async function fetchMovieDetails(id) {
  const res = await fetch(`https://omdbapi.com/?apikey=7035c60c&i=${id}`)
  return res.json()
}

export default el