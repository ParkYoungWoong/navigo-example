const el = document.createElement('div')
el.classList.add('page')
el.innerHTML = /* html */ `
  <h1>404 Not Found!</h1>
  <a href="/" data-navigo>Go to home</a>
`

export default el